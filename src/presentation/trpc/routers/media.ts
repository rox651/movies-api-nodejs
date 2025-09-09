import { procedure, router } from "../trpc";
import { object, number, parse } from "valibot";
import type { CreateMediaDTO } from "../../dto/media";
import {
   createMediaSchema,
   listMediaFilterSchema,
   updateMediaSchema,
} from "../../../domain/validation/mediaValidator";
import { paginationSchema } from "../../dto/pagination";

const listInputSchema = object({
   ...paginationSchema.entries,
   ...listMediaFilterSchema.entries,
});

export const mediaRouter = router({
   list: procedure
      .input(raw => parse(listInputSchema, raw))
      .query(async ({ ctx, input }) => {
         return ctx.services.mediaService.getAllMedia(input);
      }),
   byId: procedure
      .input(raw => parse(object({ id: number() }), raw))
      .query(async ({ ctx, input }) => ctx.services.mediaService.getMediaById(input.id)),
   create: procedure
      .input(raw => parse(createMediaSchema, raw))
      .mutation(async ({ ctx, input }) => {
         const payload = input as CreateMediaDTO;
         return ctx.services.mediaService.addNewMedia(payload);
      }),
   update: procedure
      .input(raw => parse(object({ id: number(), data: updateMediaSchema }), raw))
      .mutation(async ({ ctx, input }) => {
         return ctx.services.mediaService.updateMedia(input.id, input.data);
      }),
});
