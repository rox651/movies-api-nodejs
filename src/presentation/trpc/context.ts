import type { Request, Response } from "express";

import {
   mediaService,
   directorService,
   filmProductionService,
   genreService,
   typeService,
} from "../../app/composition";

export type TrpcServices = {
   mediaService: typeof mediaService;
   directorService: typeof directorService;
   filmProductionService: typeof filmProductionService;
   genreService: typeof genreService;
   typeService: typeof typeService;
};

export type TrpcContext = {
   req: Request;
   res: Response;
   services: TrpcServices;
};

export function createContext({ req, res }: { req: Request; res: Response }): TrpcContext {
   return {
      req,
      res,
      services: {
         mediaService,
         directorService,
         filmProductionService,
         genreService,
         typeService,
      },
   };
}
