import { middleware, MiddlewareConfig } from '@line/bot-sdk';

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || '',
};

const LineMiddleware = middleware(middlewareConfig)

export default LineMiddleware;