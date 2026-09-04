import { z } from 'zod';
import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import validate from '../../src/middlewares/validate.js';

describe('Validate Middleware', () => {
  const mockReq = (body = {}, params = {}, query = {}) => ({
    body: { ...body },
    params: { ...params },
    query: { ...query },
  });

  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  let mockNext;

  beforeEach(() => {
    mockNext = jest.fn();
  });

  describe('body validation', () => {
    const bodySchema = z.object({
      name: z.string().min(3, 'Nome precisa ter pelo menos 3 caracteres'),
    });

    test('deve chamar next() com body válido', () => {
      const req = mockReq({ name: 'João Silva' });
      const res = mockRes();
      const next = mockNext;

      const middleware = validate({ body: bodySchema });
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('deve retornar 400 com body inválido', () => {
      const req = mockReq({ name: 'Jo' });
      const res = mockRes();
      const next = mockNext;

      const middleware = validate({ body: bodySchema });
      middleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.arrayContaining(['Nome precisa ter pelo menos 3 caracteres']),
      });
    });
  });

  describe('params validation', () => {
    const paramsSchema = z.object({
      id: z.string().regex(/^\d+$/, 'ID deve ser número'),
    });

    test('deve chamar next() com params válidos', () => {
      const req = mockReq({}, { id: '123' });
      const res = mockRes();
      const next = mockNext;

      const middleware = validate({ params: paramsSchema });
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    test('deve retornar 400 com params inválidos', () => {
      const req = mockReq({}, { id: 'abc' });
      const res = mockRes();
      const next = mockNext;

      const middleware = validate({ params: paramsSchema });
      middleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('combined validation', () => {
    const combinedSchema = {
      body: z.object({ name: z.string() }),
      params: z.object({ id: z.string() }),
    };

    test('deve validar body e params juntos', () => {
      const req = mockReq({ name: 'João' }, { id: '1' });
      const res = mockRes();
      const next = mockNext;

      const middleware = validate(combinedSchema);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});