import { config } from "./config";
import { Spot } from "@binance/connector";
import { WebsocketStream } from "@binance/connector";
import * as fs from "fs";
import {ApiResponse, OrderExecutionReport} from "./types";

const { Console } = console;
const websocketOut = fs.createWriteStream("./logs/websocket/out.log");
const websocketErr = fs.createWriteStream("./logs/websocket/err.log");

const donorApiKey = config.binanceApiKey;
const donorApiSecret = config.binanceApiSecretKey;

export async function copyTrade(){

    const client = new Spot(donorApiKey, donorApiSecret);
    const logger = new Console({ stdout: websocketOut, stderr: websocketErr });

    const spotWallet:ApiResponse = (await client.accountSnapshot('SPOT')).data;
    const {snapshotVos} = spotWallet;
    const lastSnapshotVos = snapshotVos.at(-1);
    console.log(lastSnapshotVos?.type);

    const listenKey = (await client.createListenKey()).data.listenKey;

    const callbacks = {
        open: () => logger.debug("Connected with Websocket server"),
        close: () => logger.debug("Disconnected with Websocket server"),
        message: (data: OrderExecutionReport) => logger.info(data),
    };

    const websocketStreamClient = new WebsocketStream({ logger, callbacks });
    websocketStreamClient.userData(listenKey);

    setTimeout(() => websocketStreamClient.disconnect(), 600000);
}

//const apiKey = config.binanceApiKey;
//const apiSecret = config.binanceApiSecretKey;
//const client = new Spot(apiKey, apiSecret);

// Get account information
//client.account().then((response) => client.logger.log(response.data));

// Place a new order
// client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
//   price: '350',
//   quantity: 1,
//   timeInForce: 'GTC'
// }).then(response => client.logger.log(response.data))
//   .catch(error => client.logger.error(error))