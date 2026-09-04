/**
 * Middleware global de tratamento de erros.
 * Deve ser registrado por último na cadeia de middlewares.
 */
const errorHandler = (err, req, res, _next) => {
  // Log do erro para debugging
  console.error('Error:', err);

  // Erros de validação do Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      errors: err.errors.map((e) => e.message),
    });
  }

  // Erros de restrição única do Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      errors: ['Valor duplicado! Este registro já existe.'],
    });
  }

  // Erros de entidade não encontrada
  if (err.name === 'SequelizeEmptyResultError' || err.name === 'SequelizeDatabaseError') {
    return res.status(404).json({
      errors: ['Registro não encontrado!'],
    });
  }

  // Erros do Multer (upload de arquivos)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      errors: ['Arquivo muito grande! Tamanho máximo permitido é 5MB.'],
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      errors: ['Campo de arquivo inesperado!'],
    });
  }

  // Erro padrão
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor!';

  return res.status(statusCode).json({
    errors: [message],
  });
};

/**
 * Middleware para capturar erros 404 (rotas não encontradas)
 */
const notFoundHandler = (req, res) => {
  return res.status(404).json({
    errors: [`Rota ${req.method} ${req.path} não encontrada!`],
  });
};

export { errorHandler, notFoundHandler };