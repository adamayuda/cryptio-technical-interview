import {
  IBlockchainAddress,
  IBlockchainTransaction,
  IBlockchainTransactionInput,
  IBlockchainTransactionOut,
} from '../../types/blockchain';
import { ICryptoService, ICryptoTransactionsMatrix } from '../../types/crypto';
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
  }): ICryptoTransactionsMatrix[] => {
    return transactions.map((transaction: IBlockchainTransaction) => {
      return {
        amount: this.getTransactionAmount({ transaction, address }),
        time: transaction.time,
      };
    });
  };

  async getHistoricalBalances({
    address,
  }: {
    address: string;
  }): Promise<ICryptoTransactionsMatrix[]> {
    const offset = 0;
    const {
      data: { txs },
    } = await axios.get<IBlockchainAddress>(
      `${config.BLOCKCHAIN_URL}/rawaddr/${address}?offset=${offset}`,
    );

    return this.getTransactionsMatrix({ address, transactions: txs });
  }
}
