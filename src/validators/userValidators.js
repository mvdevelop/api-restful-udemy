import { z } from 'zod';

const userCreateSchema = z.object({
  nome: z
    .string({
      required_error: 'Campo nome é obrigatório!',
      invalid_type_error: 'Campo nome precisa ser uma string!',
    })
    .min(3, 'Campo nome deve ter pelo menos 3 caracteres!')
    .max(255, 'Campo nome deve ter no máximo 255 caracteres!'),
  email: z
    .string({
      required_error: 'Campo email é obrigatório!',
      invalid_type_error: 'Campo email precisa ser uma string!',
    })
    .email('Email inválido!'),
  password: z
    .string({
      required_error: 'Campo senha é obrigatório!',
      invalid_type_error: 'Campo senha precisa ser uma string!',
    })
    .min(6, 'A senha precisa ter pelo menos 6 caracteres!')
    .max(50, 'A senha precisa ter no máximo 50 caracteres!'),
});

const userUpdateSchema = z
  .object({
    nome: z
      .string()
      .min(3, 'Campo nome deve ter pelo menos 3 caracteres!')
      .max(255, 'Campo nome deve ter no máximo 255 caracteres!')
      .optional(),
    email: z.string().email('Email inválido!').optional(),
    password: z
      .string()
      .min(6, 'A senha precisa ter pelo menos 6 caracteres!')
      .max(50, 'A senha precisa ter no máximo 50 caracteres!')
      .optional(),
  })
  .strict();

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID precisa ser um número válido!'),
});

export { userCreateSchema, userUpdateSchema, idParamSchema };