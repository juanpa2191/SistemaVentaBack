require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const appConfig = require('./config/app.config');
const { swaggerDocs } = require('./config/swagger.config');
const { initDatabase } = require('./config/database.init');
const { errorHandler, notFoundHandler } = require('./common/middleware/errorHandler.middleware');

// Rutas
const productoRoutes = require('./presentation/routes/producto.routes');

const app = express();

// Middlewares de seguridad y configuración
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
swaggerDocs(app);

// Rutas de la API
app.use('/api/productos', productoRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API del Sistema de Ventas',
    version: appConfig.swagger.apiVersion,
    documentation: `${appConfig.swagger.url}:${appConfig.port}/api-docs`
  });
});

// Middlewares de manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar servidor
const startServer = async () => {
  try {
    // Inicializar base de datos
    await initDatabase();
    
    const PORT = appConfig.port;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en: ${appConfig.swagger.url}:${PORT}`);
      console.log(`📚 Documentación Swagger: ${appConfig.swagger.url}:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
