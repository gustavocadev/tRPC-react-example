import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router';

const main = async () => {
  const app = express();

  app.use(express.json()); // to allow parsing json data from the request body
  app.use(morgan('dev')); // to log all requests
  app.use(cors()); // to allow cross-origin requests

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: () => ({}),
    })
  );

  // to start the server
  const PORT = process.env.PORT ?? 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🎉`);
  });
};

main();
