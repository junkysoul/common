CREATE TYPE kline_timeframe AS ENUM ('1m', '3m', '5m', '15m', '30m', '1H', '2H', '4H', '6H', '8H', '12H', '1D' );

CREATE TABLE IF NOT EXISTS kline
(
    open_time bigint NOT NULL,
    open_price numeric(14,8) NOT NULL,
    high_price numeric(14,8) NOT NULL,
    low_price numeric(14,8) NOT NULL,
    close_price numeric(14,8) NOT NULL,
    volume numeric(25,8) NOT NULL,
    close_time bigint NOT NULL,
    trades_count integer NOT NULL,
    symbol text NOT NULL,
    timeframe kline_timeframe NOT NULL,
    CONSTRAINT unique_symbol_open_time_timeframe UNIQUE (symbol, open_time, timeframe)
)