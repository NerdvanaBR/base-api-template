import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response } from 'express';
import 'express-async-errors';

import cors from 'cors';
import { errors } from 'celebrate';

import ErrorHandler from '@shared/errors/ErrorHandler';
import projectPackage from '@root/package.json';

import uploadConfig from '@config/upload';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const { version } = projectPackage;
const { NODE_ENV, APP_NAME, APP_ADDRESS, APP_PORT = 3333 } = process.env;

const server = express();

server.use(cors());
server.use(express.json());
server.use('/files', express.static(uploadConfig.uploadsFolder));

server.use('/v1', routes);

server.use(errors());

server.use(ErrorHandler);

server.get('/version', async (request: Request, response: Response) => {
  const info = { name: APP_NAME, version };
  return response.status(200).json(info);
});

server.listen(APP_PORT, () => {
  /* eslint-disable no-console */
  console.log(
    `\n[Server]: Started on \x1b[36m${APP_ADDRESS}:${APP_PORT}\x1b[0m\x1b[0m`,
  );
  console.log(`[API]: \x1b[36mVersion ${version}\x1b[0m\x1b[0m`);
  console.log(`[Environment]: \x1b[36m${NODE_ENV}\x1b[0m\x1b[0m\n`);
  /* eslint-enable no-console */
});
