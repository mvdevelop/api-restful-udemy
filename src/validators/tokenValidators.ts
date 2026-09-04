import { z } from 'zod';

const tokenCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export { tokenCreateSchema };
export type TokenCreateInput = z.infer<typeof tokenCreateSchema>;