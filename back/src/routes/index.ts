import { Router } from 'express';
import transaction from './transaction';

export default () => {
  const app = Router();

  transaction(app);

  return app;
};
