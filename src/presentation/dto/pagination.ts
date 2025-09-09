import { number, object, optional } from "valibot";

export interface PaginationParamsDTO {
   offset?: number;
   limit?: number;
}

export const paginationSchema = object({
   offset: optional(number()),
   limit: optional(number()),
});
