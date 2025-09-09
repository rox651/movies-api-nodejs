import { procedure, router } from "../trpc";
import { object, number, parse } from "valibot";
import {
   createDirectorSchema,
   updateDirectorSchema,
} from "../../../domain/validation/directorValidator";

export const directorRouter = router({
   create: procedure
      .input(raw => parse(createDirectorSchema, raw))
      .mutation(({ ctx, input }) => ctx.services.directorService.addNewDirector(input)),
   update: procedure
      .input(raw => parse(object({ id: number(), data: updateDirectorSchema }), raw))
      .mutation(({ ctx, input }) =>
         ctx.services.directorService.updateDirector(input.id, input.data)
      ),
});
