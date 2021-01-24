import { Router } from 'express';
import transaction from './crypto';

export default () => {
  const app = Router();

  transaction(app);

  return app;
};
