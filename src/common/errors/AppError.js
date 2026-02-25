/**
 * Custom Error Class
 * Manejo de errores de la aplicación
 */
class AppError extends Error {
  /**
   * @param {string} message - Mensaje de error
   * @param {number} statusCode - Código de estado HTTP
   */
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Clase para errores de validación
 */
class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

/**
 * Clase para errores de no encontrado
 */
class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, 404);
  }
}

/**
 * Clase para errores de conflicto
 */
class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);
  }
}

/**
 * Clase para errores de no autorizado
 */
class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado') {
    super(message, 401);
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  ConflictError,
  UnauthorizedError
};
