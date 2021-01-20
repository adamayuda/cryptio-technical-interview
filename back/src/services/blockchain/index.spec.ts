import BlockchainService from '.';
import { ICryptoService } from '../../types/crypto';

describe('BlockchainService', () => {
  let blockchainService: ICryptoService;

  beforeEach(() => {
    blockchainService = new BlockchainService();
  });

  it('should be defined', () => {
    expect(blockchainService).toBeDefined();
  });

  it('should get all the transactions', async () => {
    await expect(blockchainService.getTransactions()).resolves.toEqual([]);
  });
});
