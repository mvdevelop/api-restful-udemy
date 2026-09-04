import AppError from '../../src/utils/AppError.js';

describe('AppError', () => {
  test('deve criar um erro com mensagem e status code', () => {
    const error = new AppError('Recurso não encontrado', 404);
    expect(error.message).toBe('Recurso não encontrado');
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('AppError');
    expect(error).toBeInstanceOf(Error);
  });

  test('deve usar 400 como status code padrão', () => {
    const error = new AppError('Erro de validação');
    expect(error.statusCode).toBe(400);
  });

  test('deve ter stack trace', () => {
    const error = new AppError('Test error');
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
  });
});