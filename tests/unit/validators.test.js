import {
  userCreateSchema,
  userUpdateSchema,
  idParamSchema,
} from '../../src/validators/userValidators.js';
import {
  alunoCreateSchema,
  alunoUpdateSchema,
} from '../../src/validators/alunoValidators.js';
import { tokenCreateSchema } from '../../src/validators/tokenValidators.js';

describe('User Validators', () => {
  describe('userCreateSchema', () => {
    test('deve aceitar dados válidos', () => {
      const validData = {
        nome: 'João Silva',
        email: 'joao@email.com',
        password: 'senha123',
      };
      expect(() => userCreateSchema.parse(validData)).not.toThrow();
    });

    test('deve rejeitar nome muito curto', () => {
      const invalidData = {
        nome: 'Jo',
        email: 'joao@email.com',
        password: 'senha123',
      };
      expect(() => userCreateSchema.parse(invalidData)).toThrow();
    });

    test('deve rejeitar email inválido', () => {
      const invalidData = {
        nome: 'João Silva',
        email: 'email-invalido',
        password: 'senha123',
      };
      expect(() => userCreateSchema.parse(invalidData)).toThrow();
    });

    test('deve rejeitar senha muito curta', () => {
      const invalidData = {
        nome: 'João Silva',
        email: 'joao@email.com',
        password: '123',
      };
      expect(() => userCreateSchema.parse(invalidData)).toThrow();
    });

    test('deve rejeitar campos faltando', () => {
      expect(() => userCreateSchema.parse({})).toThrow();
    });
  });

  describe('userUpdateSchema', () => {
    test('deve aceitar atualização parcial', () => {
      expect(() => userUpdateSchema.parse({ nome: 'João' })).not.toThrow();
      expect(() => userUpdateSchema.parse({ email: 'novo@email.com' })).not.toThrow();
    });

    test('deve rejeitar campos extras', () => {
      const invalidData = { nome: 'João', campoExtra: 'valor' };
      expect(() => userUpdateSchema.parse(invalidData)).toThrow();
    });
  });

  describe('idParamSchema', () => {
    test('deve aceitar ID numérico', () => {
      expect(() => idParamSchema.parse({ id: '123' })).not.toThrow();
    });

    test('deve rejeitar ID não numérico', () => {
      expect(() => idParamSchema.parse({ id: 'abc' })).toThrow();
    });
  });
});

describe('Aluno Validators', () => {
  describe('alunoCreateSchema', () => {
    test('deve aceitar dados válidos completos', () => {
      const validData = {
        nome: 'Maria',
        sobrenome: 'Santos',
        email: 'maria@email.com',
        idade: 25,
        peso: 65.5,
        altura: 1.7,
      };
      expect(() => alunoCreateSchema.parse(validData)).not.toThrow();
    });

    test('deve aceitar dados sem campos opcionais', () => {
      const minimalData = {
        nome: 'Maria',
        sobrenome: 'Santos',
        email: 'maria@email.com',
      };
      expect(() => alunoCreateSchema.parse(minimalData)).not.toThrow();
    });

    test('deve rejeitar email inválido', () => {
      const invalidData = {
        nome: 'Maria',
        sobrenome: 'Santos',
        email: 'email-invalido',
      };
      expect(() => alunoCreateSchema.parse(invalidData)).toThrow();
    });
  });

  describe('alunoUpdateSchema', () => {
    test('deve aceitar atualização de um único campo', () => {
      expect(() => alunoUpdateSchema.parse({ nome: 'João' })).not.toThrow();
    });

    test('deve rejeitar campos extras', () => {
      const invalidData = { nome: 'João', extra: 'campo' };
      expect(() => alunoUpdateSchema.parse(invalidData)).toThrow();
    });
  });
});

describe('Token Validators', () => {
  describe('tokenCreateSchema', () => {
    test('deve aceitar credenciais válidas', () => {
      const validData = {
        email: 'user@email.com',
        password: 'senha123',
      };
      expect(() => tokenCreateSchema.parse(validData)).not.toThrow();
    });

    test('deve rejeitar email inválido', () => {
      const invalidData = {
        email: 'email-invalido',
        password: 'senha123',
      };
      expect(() => tokenCreateSchema.parse(invalidData)).toThrow();
    });

    test('deve rejeitar senha vazia', () => {
      const invalidData = {
        email: 'user@email.com',
        password: '',
      };
      expect(() => tokenCreateSchema.parse(invalidData)).toThrow();
    });
  });
});