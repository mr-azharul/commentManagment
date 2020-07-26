import express from 'express';
import config from './config';

async function startServer() {
  const app = express();

  await require('./loaders').default(app);

  app.listen(config.port, () => {
    console.log(`Server Listening: ${config.port}`);
  });
}

startServer();