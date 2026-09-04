import { ZodError } from 'zod';

/**
 * Middleware factory para validação de dados com Zod.
 * Cria middlewares para validar body, params, query ou os três.
 *
 * @param {Object} schemas - Schemas Zod para validação
 * @param {import('zod').ZodSchema} [schemas.body] - Schema para req.body
 * @param {import('zod').ZodSchema} [schemas.params] - Schema para req.params
 * @param {import('zod').ZodSchema} [schemas.query] - Schema para req.query
 * @returns {Function} Middleware do Express
 */
const validate = (schemas) => (req, res, next) => {
  try {
    if (schemas.body) {
      req.body = schemas.body.parse(req.body);
    }
    if (schemas.params) {
      req.params = schemas.params.parse(req.params);
    }
    if (schemas.query) {
      req.query = schemas.query.parse(req.query);
    }
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        errors: err.issues.map((issue) => issue.message),
      });
    }
    return next(err);
  }
};

export default validate;