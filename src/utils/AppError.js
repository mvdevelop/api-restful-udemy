/**
 * Classe customizada para erros da aplicação.
 * Permite definir status HTTP e mensagem de erro.
 */
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

export default AppError;