export interface ICryptoTransactions {
  hash: string;
  amount: number;
  time: Date;
}

export interface ICryptoTransactionsHistorical {
  balance: number;
  transactions: ICryptoTransactions[];
}

export interface ICryptoService {
  getHistoricalBalances({
    address,
  }: {
    address: string;
  }): Promise<ICryptoTransactionsHistorical>;
}
