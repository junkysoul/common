import { config } from "../config";
import { Spot } from "@binance/connector";
import { WebsocketStream } from "@binance/connector";
import * as fs from "fs";
import {ApiResponse, ExchangeInfo, OrderExecutionReport} from "../types";

import {sql} from "../postgress_connection/main";

import {arrayContainsAll} from "../utils";

const { Console } = console;
const websocketOut = fs.createWriteStream("./logs/get_history_data/out.log");
const websocketErr = fs.createWriteStream("./logs/get_history_data/err.log");

const donorApiKey = config.binanceApiKey;
const donorApiSecret = config.binanceApiSecretKey;

const client = new Spot(donorApiKey, donorApiSecret);
const logger = new Console({ stdout: websocketOut, stderr: websocketErr });

function convertDateTime(timestamp) {
    const date = new Date(timestamp);

    // Get the individual components of the date and time
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the components into a human-readable date and time string
    const formattedDateTime = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedDateTime;
}

async function getDataChunk(client, code, timeframe, limit, endTime = 0): Promise<any[]>{
    const params = {limit: limit};
    if(endTime){
        params['endTime'] = endTime;
    }
    const data = await client.uiklines(code, timeframe, {limit: limit});
    console.log('x-mbx-used-weight---------------');
    console.log(data.headers['x-mbx-used-weight']);
    console.log('x-mbx-used-weight-1m---------------');
    console.log(data.headers['x-mbx-used-weight-1m']);
    const status = data.status;
    if(status == 429){
        throw new Error('Status: 429');
    }
    return data?.data;
}


async function insertData(client, symbol, timeframe, limit, endTimeParams = 0){

    let n = 1;

    let params = {limit: limit};
    if(endTimeParams){
        params['endTime'] = endTimeParams;
    }

    const klines = (await client.uiklines(symbol, timeframe, params))?.data;

    let length = klines.length;

    if(endTimeParams){
        klines.pop();
    }

    let endTime = klines[0][0];

    let values = [];
    for (let i of klines) {
        values.push([i[0], i[1], i[2], i[3], i[4], i[7], i[6], i[8], symbol, timeframe]);
    }
    await sql`
            INSERT INTO kline (
                open_time,
                open_price,
                high_price,
                low_price,
                close_price,
                volume,
                close_time,
                trades_count,
                symbol,
                timeframe
             ) VALUES ${sql(values)}
            returning *`

    while(length >= limit){

        const response = (await client.uiklines(symbol, timeframe, {limit: limit, endTime: endTime}));
        if(response.status == 429){
            throw new Error('Status: 429');
        }

        const newKlines = response?.data;

        endTime = newKlines[0][0];
        length = newKlines.length;
        newKlines.pop();

        if(!length){
            break;
        }

        let values = [];
        for (let i of newKlines) {
            values.push([i[0], i[1], i[2], i[3], i[4], i[7], i[6], i[8], symbol, timeframe]);
        }
        await sql`
            INSERT INTO kline (
                open_time,
                open_price,
                high_price,
                low_price,
                close_price,
                volume,
                close_time,
                trades_count,
                symbol,
                timeframe
             ) VALUES ${sql(values)}
            returning *`;

        console.log(n*limit);
        n++;
    }
}

export async function getHistoryData(){

    /*const exchangeInfo:ExchangeInfo = (await client.exchangeInfo()).data;
    const symbols = exchangeInfo?.symbols;

    const pairsToUSDT = [];

    symbols.forEach((item) => {
        if(item.quoteAsset == 'USDT' && arrayContainsAll(item.orderTypes, ['LIMIT', 'MARKET']) && arrayContainsAll(item.permissions, ['SPOT'])){
            pairsToUSDT.push(item?.symbol);
        }
    });*/

    const symbol = 'BTCUSDT';
    const timeFrame = '1m';
    const limit = 1000;

    /*await insertData(client, symbol, timeFrame, limit);*/

    /*console.log(data);*/


}

const oneCandleData = [
    [
        1499040000000,      // Kline open time
        "0.01634790",       // Open price
        "0.80000000",       // High price
        "0.01575800",       // Low price
        "0.01577100",       // Close price
        "148976.11427815",  // Volume
        1499644799999,      // Kline close time
        "2434.19055334",    // Quote asset volume
        308,                // Number of trades
        "1756.87402397",    // Taker buy base asset volume
        "28.46694368",      // Taker buy quote asset volume
        "0"                 // Unused field. Ignore.
    ]
]

const rates = [
    {
        rateLimitType: 'REQUEST_WEIGHT',
        interval: 'MINUTE',
        intervalNum: 1,
        limit: 6000
    },
    {
        rateLimitType: 'ORDERS',
        interval: 'SECOND',
        intervalNum: 10,
        limit: 50
    },
    {
        rateLimitType: 'ORDERS',
        interval: 'DAY',
        intervalNum: 1,
        limit: 160000
    },
    {
        rateLimitType: 'RAW_REQUESTS',
        interval: 'MINUTE',
        intervalNum: 5,
        limit: 61000
    }
]





