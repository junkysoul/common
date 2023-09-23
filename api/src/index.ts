import {copyTrade} from "./copy_trading";
import {getMarketMakingInfo} from "./bots/market_making/main";
import {tradeFlow} from "./bots/trade_flow/main";
import {getHistoryData} from "./get_history_data/main";

/*(async function () {
  await copyTrade();
})();*/

/*(async function () {
  await getMarketMakingInfo();
})();*/

/*(async function () {
  await tradeFlow();
})();*/

(async function () {
  await getHistoryData();
})();

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
