import 'reflect-metadata';
import 'express-async-errors';
import './database';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from './utils/errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());

app.use((request: Request, response: Response, _: NextFunction) => {
  return response.status(404).send('Unable to find the requested resource!');
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json(err);
  }

  // TODO: Add Log system to save the logs of the application
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
