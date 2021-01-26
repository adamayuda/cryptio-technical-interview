import {
  IBlockchainAddress,
  IBlockchainTransaction,
  IBlockchainTransactionInput,
  IBlockchainTransactionOut,
} from '../../types/blockchain';
import {
  ICryptoService,
  ICryptoTransactions,
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
    const { inputs, out } = transaction;

    const input = inputs.find((input: IBlockchainTransactionInput) => {
      return input.prev_out.addr === address;
    });
    if (input?.prev_out.value) return Number(input.prev_out.value) * -1;

    const output = out.find((o: IBlockchainTransactionOut) => {
      return o.addr === address;
    });
    if (output?.value) return Number(output.value);

    return 0;
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
    let offset = 0;
    const {
      data: { txs, n_tx },
    } = await axios.get<IBlockchainAddress>(
      `${config.BLOCKCHAIN_URL}/rawaddr/${address}?offset=${offset}`,
    );

    if (offset + 50 < n_tx) {
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
