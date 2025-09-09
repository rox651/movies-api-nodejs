import { publicProcedure, router } from "../trpc";
import { object, number, parse } from "valibot";
import {
   createFilmProductionSchema,
   updateFilmProductionSchema,
} from "../../../domain/validation/filmProductionValidator";

export const filmProductionRouter = router({
   create: publicProcedure
      .input(raw => parse(createFilmProductionSchema, raw))
      .mutation(({ ctx, input }) => ctx.services.filmProductionService.addNewFilmProduction(input)),
   update: publicProcedure
      .input(raw => parse(object({ id: number(), data: updateFilmProductionSchema }), raw))
      .mutation(({ ctx, input }) =>
         ctx.services.filmProductionService.updateFilmProduction(input.id, input.data)
      ),
});
