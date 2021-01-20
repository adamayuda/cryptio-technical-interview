import TransactionController, { ITransactionController } from '.';
import { mocked } from 'ts-jest/utils';

const post = {
  user: { username: 'username', picture: 'picture' },
  description: 'description',
  photo: 'photo',
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const req: any = {};

describe('TransactionsController', () => {
  const transactionController = new TransactionController();

  it('should return health status', async () => {
    const res = mockResponse();

    await transactionController.health(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
