import { z } from 'zod';

const alunoCreateSchema = z.object({
  nome: z
    .string({
      required_error: 'Campo nome é obrigatório!',
      invalid_type_error: 'Campo nome precisa ser uma string!',
    })
    .min(3, 'Nome precisa ter pelo menos 3 caracteres.')
    .max(255, 'Nome precisa ter no máximo 255 caracteres.'),
  sobrenome: z
    .string({
      required_error: 'Campo sobrenome é obrigatório!',
      invalid_type_error: 'Campo sobrenome precisa ser uma string!',
    })
    .min(3, 'Sobrenome precisa ter pelo menos 3 caracteres.')
    .max(255, 'Sobrenome precisa ter no máximo 255 caracteres.'),
  email: z
    .string({
      required_error: 'Campo email é obrigatório!',
      invalid_type_error: 'Campo email precisa ser uma string!',
    })
    .email('Email inválido!'),
  idade: z.coerce
    .number({
      invalid_type_error: 'Idade precisa ser um número inteiro!',
    })
    .int('Idade precisa ser um número inteiro!')
    .min(1, 'Idade precisa ser um número positivo!')
    .optional(),
  peso: z.coerce
    .number({
      invalid_type_error: 'Peso precisa ser um número!',
    })
    .positive('Peso precisa ser um número positivo!')
    .optional(),
  altura: z.coerce
    .number({
      invalid_type_error: 'Altura precisa ser um número!',
    })
    .positive('Altura precisa ser um número positivo!')
    .optional(),
});

const alunoUpdateSchema = z
  .object({
    nome: z
      .string()
      .min(3, 'Nome precisa ter pelo menos 3 caracteres.')
      .max(255, 'Nome precisa ter no máximo 255 caracteres.')
      .optional(),
    sobrenome: z
      .string()
      .min(3, 'Sobrenome precisa ter pelo menos 3 caracteres.')
      .max(255, 'Sobrenome precisa ter no máximo 255 caracteres.')
      .optional(),
    email: z.string().email('Email inválido!').optional(),
    idade: z.coerce
      .number()
      .int('Idade precisa ser um número inteiro!')
      .min(1, 'Idade precisa ser um número positivo!')
      .optional(),
    peso: z.coerce.number().positive('Peso precisa ser um número positivo!').optional(),
    altura: z.coerce.number().positive('Altura precisa ser um número positivo!').optional(),
  })
  .strict();

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID precisa ser um número válido!'),
});

export { alunoCreateSchema, alunoUpdateSchema, idParamSchema };