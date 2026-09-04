import { z } from 'zod';

const alunoCreateSchema = z.object({
  nome: z.string().min(3).max(255),
  sobrenome: z.string().min(3).max(255),
  email: z.string().email(),
  idade: z.coerce.number().int().min(1).optional(),
  peso: z.coerce.number().positive().optional(),
  altura: z.coerce.number().positive().optional(),
});

const alunoUpdateSchema = z
  .object({
    nome: z.string().min(3).max(255).optional(),
    sobrenome: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    idade: z.coerce.number().int().min(1).optional(),
    peso: z.coerce.number().positive().optional(),
    altura: z.coerce.number().positive().optional(),
  })
  .strict();

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

export { alunoCreateSchema, alunoUpdateSchema, idParamSchema };
export type AlunoCreateInput = z.infer<typeof alunoCreateSchema>;
export type AlunoUpdateInput = z.infer<typeof alunoUpdateSchema>;