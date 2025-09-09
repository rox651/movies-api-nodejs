import { initTRPC } from "@trpc/server";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
   errorFormatter({ shape }) {
      return shape;
   },
});

const errorMiddleware = t.middleware(async ({ path, type, next }) => {
   try {
      return await next();
   } catch (error) {
      console.error(`[tRPC] error in ${type} ${path}`, error);
      throw error;
   }
});

const loggingMiddleware = t.middleware(async ({ path, type, next, input }) => {
   const start = Date.now();
   const result = await next();
   const durationMs = Date.now() - start;
   if (result.ok) {
      console.log(`[tRPC] ${type} ${path} ${durationMs}ms`, { input });
   } else {
      console.warn(`[tRPC] ${type} ${path} ${durationMs}ms (error)`, { input });
   }
   return result;
});

export const router = t.router;
export const publicProcedure = t.procedure.use(errorMiddleware).use(loggingMiddleware);
