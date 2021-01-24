import BlockchainService from '../../services/blockchain';
import CryptoController from '../../controllers/crypto';
import { Router } from 'express';

const route = Router();

const blockchainService = new BlockchainService();
const cryptoController = new CryptoController(blockchainService);

export default (app: Router) => {
  app.use('/crypto', route);

  route.get('/:address/balance', cryptoController.getHistoricalBalances);
  route.post('/health', cryptoController.health);
};
