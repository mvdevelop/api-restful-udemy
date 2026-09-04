import { z } from 'zod';

const userCreateSchema = z.object({
  nome: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

const userUpdateSchema = z
  .object({
    nome: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(50).optional(),
  })
  .strict();

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

export { userCreateSchema, userUpdateSchema, idParamSchema };
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;