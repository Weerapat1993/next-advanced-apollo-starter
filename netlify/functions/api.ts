import 'dotenv/config'
import serverless from 'serverless-http';
import express, { Router } from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import '@database/mongodb'
import LineController from '@controllers/LineController';
import ProductController from '@controllers/ProductController';
import LineMiddleware from '@middleware/LineMiddleware';
import ErrorMiddleware from '@middleware/ErrorMiddleware';
import packageJson from '../../package.json'


interface IError {
  name: string;
  message: string;
  status?: number;
  stack?: string;
}

// Create a new Express application.
const api: Application = express();
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))
api.use(cookieParser())
const router = Router();

router.get('/version', (req: Request, res: Response) => res.status(200).json({
  version: packageJson.version
}));

router.post('/webhook', LineMiddleware, LineController);

router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProductBySku);
router.post('/products/create', ProductController.createProduct);
router.put('/products/update', ProductController.updateProductBySku);
router.delete('/products/delete/:sku', ProductController.deleteProductBySku);

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

export const config = {
  runtime: 'experimental-edge'
}