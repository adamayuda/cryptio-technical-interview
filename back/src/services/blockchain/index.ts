import { ICryptoService } from '../../types/crypto';

export default class BlockchainService implements ICryptoService {
  async getTransactions(): Promise<[]> {
    return [];
  }
}
