import {
  IBlockchainAddress,
  IBlockchainTransaction,
  IBlockchainTransactionInput,
  IBlockchainTransactionOut,
} from '../../types/blockchain';
import {
  ICryptoService,
  ICryptoTransactionsHistorical,
} from '../../types/crypto';
import axios from 'axios';
import { config } from '../../config';

export default class BlockchainService implements ICryptoService {
  getTransactionAmount = ({
    transaction,
    address,
  }: {
    transaction: IBlockchainTransaction;
    address: string;
  }): number => {
    const { inputs, out: outputs } = transaction;

    const inputsTotal: number = inputs
      .filter((input: IBlockchainTransactionInput) => {
        return input.prev_out.addr === address;
      })
      .map((input) => Number(input.prev_out.value))
      .reduce((i1, i2) => i1 + i2, 0);

    const outputsTotal: number = outputs
      .filter((output: IBlockchainTransactionOut) => {
        return output.addr === address;
      })
      .map((output: IBlockchainTransactionOut) => Number(output.value))
      .reduce((o1, o2) => o1 + o2, 0);

    return outputsTotal + inputsTotal * -1;
  };

  getTransactionsMatrix = ({
    address,
    transactions,
  }: {
    address: string;
    transactions: IBlockchainTransaction[];
  }): ICryptoTransactionsHistorical => {
    let balance = 0;
    const historicalTransactions = transactions.map(
      (transaction: IBlockchainTransaction) => {
        const amount = this.getTransactionAmount({ transaction, address });
        balance += amount;
        return {
          hash: transaction.hash,
          amount,
          time: transaction.time,
        };
      },
    );

    return {
      balance,
      transactions: historicalTransactions,
    };
  };

  fetchTransactionsPerPage = async ({
    address,
    offset,
    totalTransactions,
    transactions,
  }: {
    address: string;
    offset: number;
    totalTransactions: number;
    transactions: IBlockchainTransaction[];
  }): Promise<IBlockchainTransaction[]> => {
    console.log('offset', offset);
    if (offset >= totalTransactions) return transactions;
    const {
      data: { txs },
    } = await axios.get<IBlockchainAddress>(
      `${config.BLOCKCHAIN_URL}/rawaddr/${address}?offset=${offset}`,
    );

    const newTransactions = await this.fetchTransactionsPerPage({
      address,
      offset: offset + 50,
      totalTransactions,
      transactions: txs,
    });
    return [...transactions, ...newTransactions];
  };

  async getHistoricalBalances({
    address,
  }: {
    address: string;
  }): Promise<ICryptoTransactionsHistorical> {
    const {
      data: { txs, n_tx },
    } = await axios.get<IBlockchainAddress>(
      `${config.BLOCKCHAIN_URL}/rawaddr/${address}?offset=${0}`,
    );

    if (n_tx > 50) {
      const transactions: IBlockchainTransaction[] = await this.fetchTransactionsPerPage(
        {
          address,
          offset: 50,
          totalTransactions: n_tx,
          transactions: txs,
        },
      );
      return this.getTransactionsMatrix({ address, transactions });
    }
    return this.getTransactionsMatrix({ address, transactions: txs });
  }
}
