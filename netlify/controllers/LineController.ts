import type { Request, Response } from 'express';
import { WebhookEvent } from '@line/bot-sdk';
import { textEventHandler } from '../utils/line-bot';

const LineController = async (req: Request, res: Response): Promise<Response> => {
  const events: WebhookEvent[] = req.body.events;

  // Process all of the received events asynchronously.
  const results = await Promise.all(
    events.map(async (event: WebhookEvent) => {
      try {
        await textEventHandler(event);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
        }

        // Return an error message.
        return res.status(500).json({
          status: 'error',
        });
      }
    })
  );

  // Return a successfull message.
  return res.status(200).json({
    status: 'success',
    results,
  });
}

export default LineController