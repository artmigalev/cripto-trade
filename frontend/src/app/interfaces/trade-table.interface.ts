export interface TableTrade<T = Record<string, string | number>> {
  columnsLabels: ColumnKey<T>[];
  displayedColumns: Record<ColumnKey<T>, string>;
  options: tableOptions<T>;
}

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
export type ColumnKey<T> = keyof T & string;
