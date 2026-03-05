const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const appConfig = require('./app.config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: appConfig.swagger.apiTitle,
      version: appConfig.swagger.apiVersion,
      description: appConfig.swagger.apiDescription,
      contact: {
        name: 'API Support',
        email: 'support@sistemaventas.com'
      }
    },
    servers: [
      {
        url: `${appConfig.swagger.url}:${appConfig.port}`,
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        // Cliente
        Cliente: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            tipo_doc: { type: 'string' },
            doc_id: { type: 'string' },
            email: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            direccion: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        ClienteInput: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: { type: 'string' },
            tipo_doc: { type: 'string' },
            doc_id: { type: 'string' },
            email: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            direccion: { type: 'string' }
          }
        },
        // Proveedor
        Proveedor: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            email: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            direccion: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        ProveedorInput: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: { type: 'string' },
            email: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            direccion: { type: 'string' }
          }
        },
        // Producto
        Producto: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            descripcion: { type: 'string' },
            precioVenta: { type: 'number', format: 'double' },
            precioCompra: { type: 'number', format: 'double' },
            stock: { type: 'integer' },
            estado: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        ProductoInput: {
          type: 'object',
          required: ['nombre', 'precioVenta', 'precioCompra'],
          properties: {
            nombre: { type: 'string' },
            descripcion: { type: 'string' },
            precioVenta: { type: 'number', format: 'double' },
            precioCompra: { type: 'number', format: 'double' },
            stock: { type: 'integer', default: 0 },
            estado: { type: 'boolean', default: true }
          }
        },
        // Venta
        Venta: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            clienteId: { type: 'integer' },
            fecha: { type: 'string', format: 'date-time' },
            total: { type: 'number', format: 'double' },
            estado: { type: 'string', enum: ['PENDIENTE', 'COMPLETADA', 'CANCELADA'] }
          }
        },
        VentaInput: {
          type: 'object',
          required: ['clienteId', 'detalles'],
          properties: {
            clienteId: { type: 'integer' },
            detalles: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productoId: { type: 'integer' },
                  cantidad: { type: 'integer' },
                  precioUnitario: { type: 'number', format: 'double' },
                  subtotal: { type: 'number', format: 'double' }
                }
              }
            }
          }
        },
        // Compra
        Compra: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            proveedorId: { type: 'integer' },
            fecha: { type: 'string', format: 'date-time' },
            total: { type: 'number', format: 'double' },
            estado: { type: 'string', enum: ['PENDIENTE', 'RECIBIDA', 'CANCELADA'] }
          }
        },
        CompraInput: {
          type: 'object',
          required: ['proveedorId', 'detalles'],
          properties: {
            proveedorId: { type: 'integer' },
            detalles: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productoId: { type: 'integer' },
                  cantidad: { type: 'integer' },
                  precioUnitario: { type: 'number', format: 'double' },
                  subtotal: { type: 'number', format: 'double' }
                }
              }
            }
          }
        },
        // Error
        Error: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            message: { type: 'string' }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      { name: 'Clientes', description: 'Endpoints para gestionar clientes' },
      { name: 'Proveedores', description: 'Endpoints para gestionar proveedores' },
      { name: 'Productos', description: 'Endpoints para gestionar productos' },
      { name: 'Ventas', description: 'Endpoints para gestionar ventas' },
      { name: 'Compras', description: 'Endpoints para gestionar compras' }
    ]
  },
  apis: ['./src/presentation/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Configuración de Swagger UI
 */
const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: appConfig.swagger.apiTitle,
    customfavIcon: '/favicon.ico'
  }));

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

module.exports = { swaggerDocs, swaggerSpec };
