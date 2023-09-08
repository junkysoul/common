interface ExecutionReport {
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