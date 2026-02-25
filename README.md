# Sistema de Ventas API

REST API para la gestión de un sistema de ventas desarrollado con Node.js, Express y arquitectura limpia.

## 📋 Descripción

API RESTful para la gestión de productos en un sistema de ventas, implementando principios de Arquitectura Limpia (Clean Architecture).

## 🚀 Características

- **Gestión de Productos**: CRUD completo de productos
- **Arquitectura Limpia**: Separación clara de responsabilidades (Domain, Infrastructure, Presentation)
- **Documentación Swagger**: API documentada y probable mediante Swagger UI
- **Validación de Datos**: Validación de solicitudes con Joi
- **Seguridad**: Helmet, CORS, y validación de entrada

## 🛠️ Tecnologías

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MySQL
- **Documentación**: Swagger (OpenAPI)
- **Validación**: Joi, express-validator
- **Herramientas**: Nodemon, ESLint, Jest

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Variables de entorno
# Crear archivo .env en la raíz del proyecto con las siguientes variables:
```

### Variables de Entorno (.env)

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=sistema_ventas
```

## ▶️ Ejecución

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

## 📚 Documentación API

Una vez iniciado el servidor, accede a:
- **Swagger UI**: http://localhost:3000/api-docs
- **Swagger JSON**: http://localhost:3000/api-docs.json

## 📐 Estructura del Proyecto

```
src/
├── config/                 # Configuraciones
│   ├── app.config.js       # Configuración de la aplicación
│   ├── database.config.js # Configuración de base de datos
│   ├── database.init.js   # Inicialización de base de datos
│   └── swagger.config.js  # Configuración de Swagger
├── common/                 # Componentes compartidos
│   ├── errors/            # Manejo de errores
│   └── middleware/        # Middlewares Express
├── domain/                # Capa de dominio
│   ├── entities/          # Entidades del negocio
│   └── interfaces/        # Interfaces de repositorios
├── infrastructure/        # Capa de infraestructura
│   └── repositories/      # Implementaciones de repositorios
└── presentation/          # Capa de presentación
    └── routes/            # Rutas de la API
```

## 🔌 Endpoints de Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener un producto por ID |
| POST | `/api/productos` | Crear un nuevo producto |
| PUT | `/api/productos/:id` | Actualizar un producto |
| DELETE | `/api/productos/:id` | Eliminar un producto |

### Ejemplos de Solicitudes

#### Crear Producto
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Producto Ejemplo",
    "descripcion": "Descripción del producto",
    "precio": 100.00,
    "stock": 50,
    "categoria": "Electrónica"
  }'
```

#### Obtener Todos los Productos
```bash
curl -X GET http://localhost:3000/api/productos
```

## 🧪 Pruebas

```bash
# Ejecutar pruebas
npm test

# Ejecutar linter
npm run lint
```

## 📄 Licencia

ISC
