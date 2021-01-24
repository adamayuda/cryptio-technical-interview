export interface ICryptoTransactionsMatrix {
  amount: number;
  time: Date;
}

export interface ICryptoService {
  getHistoricalBalances({
    address,
  }: {
    address: string;
  }): Promise<ICryptoTransactionsMatrix[]>;
}
