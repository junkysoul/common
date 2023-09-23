import { config } from "../../config";
import { Spot } from "@binance/connector";
import { WebsocketStream } from "@binance/connector";
import * as fs from "fs";
import {ApiResponse, ExchangeInfo, OrderExecutionReport} from "../../types";

import {arrayContainsAll} from "../../utils";

const minBTCAmount = 0.0001;

const { Console } = console;
const websocketOut = fs.createWriteStream("./logs/trade_flow/out.log");
const websocketErr = fs.createWriteStream("./logs/trade_flow/err.log");

const donorApiKey = config.binanceApiKey;
const donorApiSecret = config.binanceApiSecretKey;

let _lastCalculationTime = 0;
function needToCalculate(){
    const currentTimestamp = new Date().getTime();
    if(currentTimestamp - _lastCalculationTime < 20000){
        return false;
    }
    _lastCalculationTime = currentTimestamp;
    return true;
}

const n = 100;
let summ = 400000;
let lastAverage = summ/n;
let lastVolume = 3;

if(!summ){
    summ = 4;//calculate summ
}

/*{
    '14:25 - 15:00': 'f(x) = x2+ 4x +2',
    '15:01 - 16:00': 'f(x) = x3+ x2 + 4x +2',
}

{
    '15:01' : true,
    '15:02' : true,
    '15:03' : false,
}

{
    '15:01' :  true,
    '15:02' :  true,
}

scaling
const N = 10000;
let v = (10000/v)*v

*/

const lastCoinData = {
    n: 100,
    summ: summ,
    lastAverage: lastAverage,
    lastVolume: lastVolume,
    newLastVolume: 3,
    start: function(){
        if(this.summ && this.lastVolume && this.lastAverage){

        }
    }
};


const client = new Spot(donorApiKey, donorApiSecret);
const logger = new Console({ stdout: websocketOut, stderr: websocketErr });

export async function tradeFlow(){

    const callbacks = {
        open: () => logger.debug("Connected with Websocket server"),
        close: () => logger.debug("Disconnected with Websocket server"),
        message: (data: OrderExecutionReport) => {console.log(needToCalculate())},
    };

    const websocketStreamClient = new WebsocketStream({ logger, callbacks });

    websocketStreamClient.miniTicker();

    setTimeout(() => websocketStreamClient.disconnect(), 600000);

}




