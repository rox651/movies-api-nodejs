import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { director } from "../../infrastructure/db/tables";

export type Director = InferSelectModel<typeof director>;
export type NewDirector = InferInsertModel<typeof director>;
