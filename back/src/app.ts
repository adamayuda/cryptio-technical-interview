import cors from 'cors';
import express from 'express';

const app = express();

// Enable CORS for *
app.use(cors());

app.get('/ping', (_, res) => {
  res.send('pong');
});

const port = 8080;
app.listen(port, () => {
  console.log(
    `Server listening on port ${port} (${
      process.env.NODE_ENV ?? 'unknown environment'
    })`,
  );
});
