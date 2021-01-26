import { ICryptoTransactionsHistorical } from 'src/types/crypto';

export interface IBlockchainTransactionOut {
  value: string | number;
  hash?: string;
  script?: string;
  addr?: string;
}

export interface IBlockchainTransactionInput {
  prev_out: {
    hash?: string;
    value: string | number;
    addr?: string;
    tx_index?: string;
    n?: string;
  };
  script?: string;
}

export interface IBlockchainTransaction {
  hash: string;
  ver: number;
  vin_sz: number;
  ICryptoTransactionsHistorical;
  vout_sz: number;
  time: Date;
  lock_time: string;
  size: number;
  relayed_by: string;
  block_height: number;
  tx_index: string;
  inputs: IBlockchainTransactionInput[];
  out: IBlockchainTransactionOut[];
}

export interface IBlockchainAddress {
  hash160: string;
  address: string;
  n_tx: number;
  n_unredeemed: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
  txs: IBlockchainTransaction[];
}
