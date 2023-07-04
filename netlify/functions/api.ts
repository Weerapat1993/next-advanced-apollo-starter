import 'dotenv/config'
import serverless from 'serverless-http';
import express, { Router } from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import packageJson from '../../package.json'
import LineController from '../controllers/LineController';
import LineMiddleware from '../middleware/LineMiddleware';
import ErrorMiddleware from '../middleware/ErrorMiddleware';

interface IError {
  name: string;
  message: string;
  status?: number;
  stack?: string;
}

// Create a new Express application.
const api: Application = express();
const router = Router();

router.get('/version', (req: Request, res: Response) => res.status(200).json({
  version: packageJson.version
}));

router.post('/webhook', LineMiddleware, LineController);

// catch 404 and forward to error handler
router.use((req: Request, res: Response, next: NextFunction) => {
  const err: IError = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
router.use(ErrorMiddleware);

api.use('/api/', router);

export const handler = serverless(api);