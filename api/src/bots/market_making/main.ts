import { config } from "../../config";
import { Spot } from "@binance/connector";
import { WebsocketStream } from "@binance/connector";
import * as fs from "fs";
import {ApiResponse, ExchangeInfo, OrderExecutionReport} from "../../types";
import _ from 'lodash';

import {arrayContainsAll} from "../../utils";

const { Console } = console;
const websocketOut = fs.createWriteStream("./logs/websocket/out.log");
const websocketErr = fs.createWriteStream("./logs/websocket/err.log");

const donorApiKey = config.binanceApiKey;
const donorApiSecret = config.binanceApiSecretKey;

const client = new Spot(donorApiKey, donorApiSecret);
const logger = new Console({ stdout: websocketOut, stderr: websocketErr });

export async function getMarketMakingInfo(){
    /*client.exchangeInfo().then(response => client.logger.log(response.data));*/

    const exchangeInfo:ExchangeInfo = (await client.exchangeInfo()).data;
    const symbols = exchangeInfo?.symbols;
    const pairsToBTC = symbols.filter(item => {
        return (item.quoteAsset == 'BTC' && arrayContainsAll(item.orderTypes, ['LIMIT', 'MARKET']) && arrayContainsAll(item.permissions, ['SPOT']));
    });

    console.log(pairsToBTC);

    const pairs = [];
    const usedPairs = [];
    pairs.forEach((item) => {
        const pairCode = 'BNBUSDT';

        const queueFirstPosAmount = 0;

        const buyPrice = 0;
        const sellPrice = 0;
        const delta = sellPrice - buyPrice;
        if(delta/0.01101001 >= buyPrice){
            usedPairs.push({
                pairCode: pairCode,
                delta: delta,
                buyPrice: buyPrice,
                sellPrice: sellPrice
            });
        }
    });

    const summ = 0;
}




