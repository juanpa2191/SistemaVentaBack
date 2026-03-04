const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'unac1234',
  multipleStatements: true
};

const initDatabase = async () => {
  let connection;
  
  try {

    console.log(dbConfig);
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión a MySQL establecida');

    const schema = `
      -- ===============================
      -- CLIENTES
      -- ===============================
      CREATE TABLE IF NOT EXISTS cliente (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR (100) NOT NULL,
          tipo_doc VARCHAR (100) NOT NULL,
          doc_id INT UNIQUE NOT NULL,
          email VARCHAR (150) UNIQUE,
          telefono VARCHAR (20),
          direccion VARCHAR (200),
          created_at timestamp default current_timestamp,
          updated_at timestamp default current_timestamp on update current_timestamp

      -- ===============================
      -- PROVEEDORES
      -- ===============================
      CREATE TABLE IF NOT EXISTS proveedor (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(150) NOT NULL,
          email VARCHAR(150),
          telefono VARCHAR(20),
          direccion VARCHAR(200),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      -- ===============================
      -- PRODUCTOS
      -- ===============================
      CREATE TABLE IF NOT EXISTS producto (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(150) NOT NULL,
          descripcion TEXT,
          precio_venta DECIMAL(10,2) NOT NULL,
          precio_compra DECIMAL(10,2) NOT NULL,
          stock INT NOT NULL DEFAULT 0,
          estado BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      -- ===============================
      -- VENTAS
      -- ===============================
      CREATE TABLE IF NOT EXISTS venta (
          id INT AUTO_INCREMENT PRIMARY KEY,
          cliente_id INT NOT NULL,
          fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
          total DECIMAL(12,2) NOT NULL DEFAULT 0,
          estado ENUM('PENDIENTE', 'COMPLETADA', 'CANCELADA') DEFAULT 'PENDIENTE',

          FOREIGN KEY (cliente_id) REFERENCES cliente(id)
      );

      -- ===============================
      -- DETALLE VENTA
      -- ===============================
      CREATE TABLE IF NOT EXISTS detalle_venta (
          id INT AUTO_INCREMENT PRIMARY KEY,
          venta_id INT NOT NULL,
          producto_id INT NOT NULL,
          cantidad INT NOT NULL,
          precio_unitario DECIMAL(10,2) NOT NULL,
          subtotal DECIMAL(12,2) NOT NULL,

          FOREIGN KEY (venta_id) REFERENCES venta(id) ON DELETE CASCADE,
          FOREIGN KEY (producto_id) REFERENCES producto(id)
      );

      -- ===============================
      -- COMPRAS
      -- ===============================
      CREATE TABLE IF NOT EXISTS compra (
          id INT AUTO_INCREMENT PRIMARY KEY,
          proveedor_id INT NOT NULL,
          fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
          total DECIMAL(12,2) NOT NULL DEFAULT 0,
          estado ENUM('PENDIENTE', 'RECIBIDA', 'CANCELADA') DEFAULT 'PENDIENTE',

          FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
      );

      -- ===============================
      -- DETALLE COMPRA
      -- ===============================
      CREATE TABLE IF NOT EXISTS detalle_compra (
          id INT AUTO_INCREMENT PRIMARY KEY,
          compra_id INT NOT NULL,
          producto_id INT NOT NULL,
          cantidad INT NOT NULL,
          precio_unitario DECIMAL(10,2) NOT NULL,
          subtotal DECIMAL(12,2) NOT NULL,

          FOREIGN KEY (compra_id) REFERENCES compra(id) ON DELETE CASCADE,
          FOREIGN KEY (producto_id) REFERENCES producto(id)
      );
    `;

    await connection.query(`CREATE DATABASE IF NOT EXISTS sistema_ventas`);
    await connection.query(`USE sistema_ventas`);
    await connection.query(schema);
    
    console.log('✅ Base de datos y tablas inicializadas correctamente');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

module.exports = { initDatabase };
