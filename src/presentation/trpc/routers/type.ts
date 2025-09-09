import { publicProcedure, router } from "../trpc";
import { object, number, parse } from "valibot";
import { createTypeSchema, updateTypeSchema } from "../../../domain/validation/typeValidator";

export const typeRouter = router({
   create: publicProcedure
      .input(raw => parse(createTypeSchema, raw))
      .mutation(({ ctx, input }) => ctx.services.typeService.addNewType(input)),
   update: publicProcedure
      .input(raw => parse(object({ id: number(), data: updateTypeSchema }), raw))
      .mutation(({ ctx, input }) => ctx.services.typeService.updateType(input.id, input.data)),
});
