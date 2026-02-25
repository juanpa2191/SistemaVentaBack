/**
 * Configuración de la aplicación
 */
module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  swagger: {
    url: process.env.SWAGGER_URL || 'http://localhost:3000',
    apiTitle: process.env.API_TITLE || 'Sistema de Ventas API',
    apiVersion: process.env.API_VERSION || '1.0.0',
    apiDescription: process.env.API_DESCRIPTION || 'API REST para el Sistema de Ventas'
  }
};
