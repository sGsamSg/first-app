import { createTRPCRouter } from '../init';
import { candidatesRouter } from '@/modules/candidates/server/procedures';

export const appRouter = createTRPCRouter({
  candidates: candidatesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;