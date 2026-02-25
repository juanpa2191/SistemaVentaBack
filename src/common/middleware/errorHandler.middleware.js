const { AppError } = require('../errors/AppError');

/**
 * Middleware de manejo de errores
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función next
 */
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
    }
  }
};

/**
 * Middleware para rutas no encontradas
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función next
 */
const notFoundHandler = (req, res, next) => {
  const err = new AppError(`Not Found - ${req.originalUrl}`, 404);
  next(err);
};

module.exports = {
  errorHandler,
  notFoundHandler
};
