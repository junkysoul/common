export interface OrderExecutionReport {
  /**
   * Event type (e.g., "executionReport")
   */
  e: string;

  /**
   * Event time (e.g., 1499405658658)
   */
  E: number;

  /**
   * Symbol (e.g., "ETHBTC")
   */
  s: string;

  /**
   * Client order ID (e.g., "mUvoqJxFIILMdfAW5iGSOW")
   */
  c: string;

  /**
   * Side (e.g., "BUY")
   */
  S: string;

  /**
   * Order type (e.g., "LIMIT")
   */
  o: string;

  /**
   * Time in force (e.g., "GTC")
   */
  f: string;

  /**
   * Order quantity (e.g., "1.00000000")
   */
  q: string;

  /**
   * Order price (e.g., "0.10264410")
   */
  p: string;

  /**
   * Stop price (e.g., "0.00000000")
   */
  P: string;

  /**
   * Iceberg quantity (e.g., "0.00000000")
   */
  F: string;

  /**
   * OrderListId (e.g., -1)
   */
  g: number;

  /**
   * Original client order ID; This is the ID of the order being canceled (e.g., "")
   */
  C: string;

  /**
   * Current execution type (e.g., "NEW")
   */
  x: string;

  /**
   * Current order status (e.g., "NEW")
   */
  X: string;

  /**
   * Order reject reason; will be an error code (e.g., "NONE")
   */
  r: string;

  /**
   * Order ID (e.g., 4293153)
   */
  i: number;

  /**
   * Last executed quantity (e.g., "0.00000000")
   */
  l: string;

  /**
   * Cumulative filled quantity (e.g., "0.00000000")
   */
  z: string;

  /**
   * Last executed price (e.g., "0.00000000")
   */
  L: string;

  /**
   * Commission amount (e.g., "0")
   */
  n: string;

  /**
   * Commission asset (e.g., null)
   */
  N: null;

  /**
   * Transaction time (e.g., 1499405658657)
   */
  T: number;

  /**
   * Trade ID (e.g., -1)
   */
  t: number;

  /**
   * Ignore (e.g., 8641984)
   */
  I: number;

  /**
   * Is the order on the book? (e.g., true)
   */
  w: boolean;

  /**
   * Is this trade the maker side? (e.g., false)
   */
  m: boolean;

  /**
   * Ignore (e.g., false)
   */
  M: boolean;

  /**
   * Order creation time (e.g., 1499405658657)
   */
  O: number;

  /**
   * Cumulative quote asset transacted quantity (e.g., "0.00000000")
   */
  Z: string;

  /**
   * Last quote asset transacted quantity (e.g., "0.00000000")
   */
  Y: string;

  /**
   * Quote Order Quantity (e.g., "0.00000000")
   */
  Q: string;

  /**
   * Working Time; This is only visible if the order has been placed on the book. (e.g., 1499405658657)
   */
  W: number;

  /**
   * selfTradePreventionMode (e.g., "NONE")
   */
  V: string;
}

/**
 * Represents an API response object.
 */
export type ApiResponse = {
  /**
   * The HTTP status code. A value of 200 indicates success.
   * @example 200
   */
  code: number;

  /**
   * An optional error message. This field is empty for successful responses.
   * @example ""
   */
  msg: string;

  /**
   * An array of snapshot data objects.
   */
  snapshotVos: SnapshotVo[];
};


type SnapshotVo = {
  data: {
    balances: Balance[];

    /**
     * The total asset value in BTC (Bitcoin) for this snapshot.
     * @example "0.09942700"
     */
    totalAssetOfBtc: string;
  };

  /**
   * The type of account
   * @example "spot"
   */
  type: string;

  /**
   * The timestamp when this snapshot was last updated, in milliseconds since the Unix epoch.
   * @example 1576281599000
   */
  updateTime: number;
};

/**
 * Represents a balance of a specific asset.
 */
type Balance = {
  /**
   * The asset symbol, e.g., "BTC" for Bitcoin.
   * @example "BTC"
   */
  asset: string;

  /**
   * The free balance of the asset.
   * @example "0.09905021"
   */
  free: string;

  /**
   * The locked balance of the asset (typically 0 in this context).
   * @example "0.00000000"
   */
  locked: string;
};

interface RateLimit {
  /**
   * Rate limit type, e.g., "REQUEST_WEIGHT".
   */
  rateLimitType: string; // Example: "REQUEST_WEIGHT"

  /**
   * Maximum allowed requests per minute for this rate limit.
   */
  interval: number; // Example: 60000

  /**
   * The number of requests allowed in the specified interval.
   */
  limit: number; // Example: 1200
}

interface Filter {
  /**
   * The filter type, e.g., "PRICE_FILTER".
   */
  filterType: string; // Example: "PRICE_FILTER"

  /**
   * The minimum price allowed for trading.
   */
  minPrice: number; // Example: 0.001

  /**
   * The maximum price allowed for trading.
   */
  maxPrice: number; // Example: 1000.0

  /**
   * The tick size for price increments.
   */
  tickSize: number; // Example: 0.001

  // Additional fields and their descriptions here.
}

interface SymbolInfo {
  /**
   * The trading symbol, e.g., "ETHBTC".
   */
  symbol: string; // Example: "ETHBTC"

  /**
   * The trading status, e.g., "TRADING".
   */
  status: string; // Example: "TRADING"

  /**
   * The base asset symbol, e.g., "ETH".
   */
  baseAsset: string; // Example: "ETH"

  /**
   * The precision of the base asset, e.g., 8.
   */
  baseAssetPrecision: number; // Example: 8

  /**
   * The quote asset symbol, e.g., "BTC".
   */
  quoteAsset: string; // Example: "BTC"

  /**
   * The precision of the quote asset, e.g., 8.
   */
  quotePrecision: number; // Example: 8

  /**
   * The precision of the quote asset for market orders, e.g., 8.
   */
  quoteAssetPrecision: number; // Example: 8

  /**
   * Allowed order types, e.g., ["LIMIT", "MARKET"].
   */
  orderTypes: string[]; // Example: ["LIMIT", "MARKET"]

  /**
   * Whether iceberg orders are allowed, e.g., true.
   */
  icebergAllowed: boolean; // Example: true

  /**
   * Whether OCO (One Cancels the Other) orders are allowed, e.g., true.
   */
  ocoAllowed: boolean; // Example: true

  /**
   * Whether quote order quantity for market orders is allowed, e.g., true.
   */
  quoteOrderQtyMarketAllowed: boolean; // Example: true

  /**
   * Whether trailing stop orders are allowed, e.g., false.
   */
  allowTrailingStop: boolean; // Example: false

  /**
   * Whether cancel/replace orders are allowed, e.g., false.
   */
  cancelReplaceAllowed: boolean; // Example: false

  /**
   * Whether spot trading is allowed, e.g., true.
   */
  isSpotTradingAllowed: boolean; // Example: true

  /**
   * Whether margin trading is allowed, e.g., true.
   */
  isMarginTradingAllowed: boolean; // Example: true

  /**
   * Filters associated with this symbol (e.g., PRICE_FILTER).
   */
  filters: Filter[]; // These are defined in the Filters section.

  /**
   * Permissions for trading this symbol, e.g., ["SPOT", "MARGIN"].
   */
  permissions: string[]; // Example: ["SPOT", "MARGIN"]

  /**
   * The default self-trade prevention mode, e.g., "NONE".
   */
  defaultSelfTradePreventionMode: string; // Example: "NONE"

  /**
   * Allowed self-trade prevention modes, e.g., ["NONE"].
   */
  allowedSelfTradePreventionModes: string[]; // Example: ["NONE"]
}

export interface ExchangeInfo {
  /**
   * The timezone of the server, e.g., "UTC".
   */
  timezone: string; // Example: "UTC"

  /**
   * The server time in milliseconds since epoch, e.g., 1565246363776.
   */
  serverTime: number; // Example: 1565246363776

  /**
   * Rate limits for various operations.
   */
  rateLimits: RateLimit[]; // Array of RateLimit objects, see RateLimit interface for details.

  /**
   * Exchange filters.
   */
  exchangeFilters: Filter[]; // Array of Filter objects, see Filter interface for details.

  /**
   * Symbols information.
   */
  symbols: SymbolInfo[]; // Array of SymbolInfo objects, see SymbolInfo interface for details.
}
