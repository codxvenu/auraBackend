import { z } from "zod";

export const LoginSchema = z.object({
  body: z.object({
    user: z.object({
      email: z.string().email(),
      password: z.coerce.string().min(3),
    }),
  })
});
export const RegisterSchema = z.object({
  body: z.object({
    user: z.object({
      fullname : z.string(),
      email: z.string().email(),
      password: z.coerce.string().min(3)
    }),
  })
});
export const MeSchema = z.object({
    userId: z.coerce.string()
});

