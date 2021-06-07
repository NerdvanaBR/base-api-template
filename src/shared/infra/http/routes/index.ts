import { Router, Request, Response } from 'express';

const routes = Router();

routes.use('/ping', async (_request: Request, response: Response) =>
  response.send('pong\n'),
);

export default routes;
