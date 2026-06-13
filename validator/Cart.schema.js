import { z } from "zod";

export const CartAddItemSchema = z.object({
  body: z.object({
    itemId : z.string(),
    quantity : z.number(),
  }),
  userId: z.coerce.string()
});


