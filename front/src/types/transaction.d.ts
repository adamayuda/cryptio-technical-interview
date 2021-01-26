export interface ITransactionsMatrix {
  balance: number;
  transactions: ITransaction[];
}

export interface ITransaction {
  hash: string;
  amount: number;
  time: number;
}
