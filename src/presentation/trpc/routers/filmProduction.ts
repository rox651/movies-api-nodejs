import { procedure, router } from "../trpc";
import { object, number, parse } from "valibot";
import {
   createFilmProductionSchema,
   updateFilmProductionSchema,
} from "../../../domain/validation/filmProductionValidator";

export const filmProductionRouter = router({
   create: procedure
      .input(raw => parse(createFilmProductionSchema, raw))
      .mutation(({ ctx, input }) => ctx.services.filmProductionService.addNewFilmProduction(input)),
   update: procedure
      .input(raw => parse(object({ id: number(), data: updateFilmProductionSchema }), raw))
      .mutation(({ ctx, input }) =>
         ctx.services.filmProductionService.updateFilmProduction(input.id, input.data)
      ),
});
