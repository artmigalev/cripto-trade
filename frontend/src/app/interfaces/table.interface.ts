export interface Table<T = Record<string, string | number>> {
  columnsLabels: ColumnKey<T>[];
  displayedColumns: Record<ColumnKey<T>, string>;
  options?:
    | TradeTable
    | BriefTable
    | MarketsTable
    | OrderBookTable
    | OrderHistory
    | AssetTable;
}
export type ColumnKey<T> = keyof T & string;

export interface tableOptions<T> {
  sortOptions: {
    status: boolean;
    columns?: ColumnKey<T>[];
  };
  convert: {
    status: boolean;
    columns?: ColumnKey<T>[];
    value?: string;
  };
}

export interface TableSchema<T> extends Table {
  type:
    | 'BriefTable'
    | 'TradeTable'
    | 'MarketsTable'
    | 'OrderBookTable'
    | 'OrderHistory'
    | 'AssetTable';
  dataTable: T[];
}

// -------------------------------------

// interface TradeTable {}
// // -------------------------------------
// interface BriefTable {

// }
// // Show a brief table: 3–5 main assets with their quantity and current value.
// // -------------------------------------
// type MarketsTable = tableOptions<Record<string, string | number>>;
// // Display a table of all available trading pairs fetched from Binance Testnet API.
// // Columns: Pair, Price, 24h Change (%), 24h Volume.
// // -------------------------------------
// interface OrderBookTable {}
// // Display the order book: separate columns for bids (buy) and asks (sell).
// // Each row: price and volume.
// // -------------------------------------
// interface OrderHistory {}
// //A table of user orders loaded from the API (GET /api/v3/allOrders, HMAC).
// // Columns: Date, Pair, Side (Buy/Sell), Type (Market/Limit), Quantity, Price, Status.

// interface AssetTable {}
// // Display all user assets with a non-zero balance, fetched from Binance Testnet API (GET /api/v3/account, HMAC).
// // Columns: Asset (BTC, ETH, USDT…), Available Balance, In Order, Current Price (USD), Total Value (USD).
