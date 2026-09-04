import { z } from 'zod';

const tokenCreateSchema = z.object({
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
    .min(1, 'Senha é obrigatória!'),
});

export { tokenCreateSchema };