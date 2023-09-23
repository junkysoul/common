import { config } from "../../config";
import { Spot } from "@binance/connector";
import { WebsocketStream } from "@binance/connector";
import * as fs from "fs";
import {ApiResponse, ExchangeInfo, OrderExecutionReport} from "../../types";

import {arrayContainsAll} from "../../utils";

const minBTCAmount = 0.0001;

const { Console } = console;
const websocketOut = fs.createWriteStream("./logs/market_making/out.log");
const websocketErr = fs.createWriteStream("./logs/market_making/err.log");

const donorApiKey = config.binanceApiKey;
const donorApiSecret = config.binanceApiSecretKey;

const client = new Spot(donorApiKey, donorApiSecret);
const logger = new Console({ stdout: websocketOut, stderr: websocketErr });

export async function getMarketMakingInfo(){

    const listenKey = (await client.createListenKey()).data.listenKey;

    const callbacks = {
        open: () => logger.debug("Connected with Websocket server"),
        close: () => logger.debug("Disconnected with Websocket server"),
        message: (data: OrderExecutionReport) => logger.info(data),
    };

    const websocketStreamClient = new WebsocketStream({ logger, callbacks });
    websocketStreamClient.userData(listenKey);

    setTimeout(() => websocketStreamClient.disconnect(), 600000);

    const pairCode = 'COSBTC';

    const price = 0.00000003;
    const quantity = Math.ceil(minBTCAmount/price);

    //create order
    try {
        const newOrder = (await client.newOrder(pairCode, 'BUY', 'LIMIT', {
            price: price.toFixed(8),
            quantity: quantity,
            timeInForce: 'GTC'
        }));
        console.log(newOrder.data);
    } catch(error) {
        console.log('!!!error----------- ');
        console.log(error);
    }


    /*const exchangeInfo:ExchangeInfo = (await client.exchangeInfo()).data;
    const symbols = exchangeInfo?.symbols;
    const pairsToBTC = symbols.filter(item => {
        return (item.quoteAsset == 'BTC' && arrayContainsAll(item.orderTypes, ['LIMIT', 'MARKET']) && arrayContainsAll(item.permissions, ['SPOT']));
    });*/

    /*const pairs = [];
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

    const summ = 0;*/
}




