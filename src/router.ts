import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const products = [
  {
    id: 1,
    name: 'Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
  },
];

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return `Hello by default`;
  }),
  getProducts: publicProcedure.query(() => {
    return products;
  }),

  createProduct: publicProcedure
    .input(z.object({ productName: z.string() }))
    .mutation(({ input }) => {
      products.push({
        id: products.length + 1,
        name: input.productName,
      });
      return {
        msg: 'product created',
      };
    }),
});

export type AppRouter = typeof appRouter;
