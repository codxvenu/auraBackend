import { z } from "zod";

export const CartAddItemSchema = z.object({
  body: z.object({
    itemId : z.string()
  }),
  userId: z.coerce.string()
});


