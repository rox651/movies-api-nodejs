import type { InferModel } from "drizzle-orm";
import { media } from "../../infrastructure/db/tables/media";

export type Media = InferModel<typeof media>;
export type NewMedia = InferModel<typeof media, "insert">;
