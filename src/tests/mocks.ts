import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";

import { appRouter } from "../presentation/trpc/routers/_app";
import type { TrpcContext } from "../presentation/trpc/context";
import {
   mediaService,
   directorService,
   filmProductionService,
   genreService,
   typeService,
} from "../app/composition";

export function buildTrpcTestApp() {
   const services = {
      mediaService,
      directorService,
      filmProductionService,
      genreService,
      typeService,
   };

   const app = express();
   app.use(express.json());
   app.use(
      "/trpc",
      trpcExpress.createExpressMiddleware({
         router: appRouter,
         createContext: ({ req, res }) => ({ req, res, services } as TrpcContext),
      })
   );

   return { app, services };
}
