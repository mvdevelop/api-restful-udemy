import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error & { statusCode?: number; code?: string; errors?: Array<{ message: string }> },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error('Error:', err);

  if (err.name === 'SequelizeValidationError') {
    res.status(400).json({
      errors: err.errors?.map((e) => e.message) || ['Erro de validação!'],
    });
    return;
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(409).json({
      errors: ['Valor duplicado! Este registro já existe.'],
    });
    return;
  }

  if (err.name === 'SequelizeEmptyResultError' || err.name === 'SequelizeDatabaseError') {
    res.status(404).json({
      errors: ['Registro não encontrado!'],
    });
    return;
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(413).json({
      errors: ['Arquivo muito grande! Tamanho máximo permitido é 5MB.'],
    });
    return;
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    res.status(400).json({
      errors: ['Campo de arquivo inesperado!'],
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor!';

  res.status(statusCode).json({
    errors: [message],
  });
};

const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    errors: [`Rota ${req.method} ${req.path} não encontrada!`],
  });
};

export { errorHandler, notFoundHandler };