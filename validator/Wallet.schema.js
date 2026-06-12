import { z } from "zod";

export const WalletAddSchema = z.object({
  body: z.object({
    amount : z.coerce.number(),
    type : z.coerce.string(),
    fileId : z.coerce.string()
  }),
  userId: z.coerce.string()
});


