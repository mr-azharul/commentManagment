import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import routes from '../api';
import config from '../config';

export default async ({ app }: { app: express.Application }) => {
  app.enable('trust proxy');

  app.use(cors());
  app.options('*', cors());

  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.use('/status', (req, res) => {
    res.status(200).end();
  });
  
  app.use(config.api.prefix, routes());

  return app;
}