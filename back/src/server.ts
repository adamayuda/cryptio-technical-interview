import { config, generateConfig } from './config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import routes from './routes';

export const startServer = async () => {
  const app = express();

  try {
    generateConfig();
  } catch (e) {
    console.error(e.message);
    return;
  }

  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use(cors());

  app.use(routes());

  app
    .listen(config.PORT, () => {
      console.log(`🚀 Server listening on port: ${config.PORT} 🚀`);
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
};

startServer();
