import { RequestHandler } from 'express';

import { Controller } from '@/application/controllers';

type Adapter = <T>(controller: Controller<T>) => RequestHandler;

export const expressRouteAdapter: Adapter =
  (controller) => async (req, res) => {
    try {
      const { body, query, params, headers } = req;

      const { statusCode, data } = await controller.handle({
        body,
        query,
        params,
        headers,
      });

      res.status(statusCode).json(data);
    } catch (error) {

      const defaultName = 'ServerError';
      const defaultMessage = 'Server Error';

      const { message = defaultMessage, name = defaultName } = error as any;

      res.status((error as any)?.statusCode ?? 500).json({ name, message });
    }
  };
