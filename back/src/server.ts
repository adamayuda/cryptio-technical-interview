import cors from 'cors';
import express from 'express';

const server = express();

// Enable CORS for *
server.use(cors());

server.get('/ping', (_, res) => {
  res.send('pong');
});

const port = 8080;
server.listen(port, () => {
  console.log(
    `Server listening on port ${port} (${
      process.env.NODE_ENV ?? 'unknown environment'
    })`,
  );
});
