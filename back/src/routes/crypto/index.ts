import BlockchainService from '../../services/blockchain';
import { Router } from 'express';
import TransactionController from '../../controllers/crypto';

const route = Router();

const blockchainService = new BlockchainService();
const transactionController = new TransactionController(blockchainService);

export default (app: Router) => {
  app.use('/transactions', route);

  route.post('/health', transactionController.health);
};
