import { Router } from 'express';
import TransactionController from '../../controllers/transaction';

const transactionController = new TransactionController();

const route = Router();

export default (app: Router) => {
  app.use('/transactions', route);

  route.post('/health', transactionController.health);
};
