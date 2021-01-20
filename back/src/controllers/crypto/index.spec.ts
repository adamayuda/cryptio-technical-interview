import BlockchainService from '../../services/blockchain';
import CryptoController from '.';
import { ICryptoService } from '../../types/crypto';
import { mocked } from 'ts-jest/utils';

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const req: any = {};

jest.mock('../../services/blockchain', () => {
  return {
    getTransactions: jest.fn().mockResolvedValue({}),
  };
});
describe('CryptosController', () => {
  const mockedBlockchainService: any = mocked(BlockchainService, true);
  const blockchainController = new CryptoController(mockedBlockchainService);

  it('should return health status', async () => {
    const res = mockResponse();

    await blockchainController.health(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
