const mysql = require('mysql2/promise');

/**
 * Configuración de la base de datos MySQL
 */
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'sistema_ventas',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

let pool;

/**
 * Obtiene el pool de conexiones a la base de datos
 * @returns {Promise<mysql.Pool>}
 */
const getPool = async () => {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
};

/**
 * Ejecuta una consulta simple
 * @param {string} sql - Consulta SQL
 * @param {Array} params - Parámetros de la consulta
 * @returns {Promise<mysql.QueryResult>}
 */
const execute = async (sql, params = []) => {
  const poolConnection = await getPool();
  const [results] = await poolConnection.execute(sql, params);
  return results;
};

/**
 * Ejecuta una consulta con múltiples resultados
 * @param {string} sql - Consulta SQL
 * @param {Array} params - Parámetros de la consulta
 * @returns {Promise<mysql.QueryResult>}
 */
const query = async (sql, params = []) => {
  const poolConnection = await getPool();
  const [results] = await poolConnection.query(sql, params);
  return results;
};

/**
 * Obtiene una conexión del pool
 * @returns {Promise<mysql.PoolConnection>}
 */
const getConnection = async () => {
  const poolConnection = await getPool();
  return poolConnection.getConnection();
};

/**
 * Cierra el pool de conexiones
 */
const closePool = async () => {
  if (pool) {
    await pool.end();
    pool = null;
  }
};

module.exports = {
  getPool,
  execute,
  query,
  getConnection,
  closePool,
  dbConfig
};
