const { query, execute, getConnection } = require('../../config/database.config');
const Producto = require('../../domain/entities/Producto');

/**
 * Repository: ProductoRepository
 * Implementación del repositorio de productos
 */
class ProductoRepository {
  /**
   * Obtiene todos los productos
   * @returns {Promise<Producto[]>}
   */
  async findAll() {
    const sql = 'SELECT * FROM producto ORDER BY id DESC';
    const rows = await query(sql);
    return rows.map(row => Producto.fromDatabase(row));
  }

  /**
   * Obtiene un producto por ID
   * @param {number} id - ID del producto
   * @returns {Promise<Producto|null>}
   */
  async findById(id) {
    const sql = 'SELECT * FROM producto WHERE id = ?';
    const rows = await query(sql, [id]);
    if (rows.length === 0) return null;
    return Producto.fromDatabase(rows[0]);
  }

  /**
   * Crea un nuevo producto
   * @param {Object} producto - Datos del producto
   * @returns {Promise<Producto>}
   */
  async create(producto) {
    const sql = `
      INSERT INTO producto (nombre, descripcion, precio_venta, precio_compra, stock, estado)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await execute(sql, [
      producto.nombre,
      producto.descripcion,
      producto.precioVenta,
      producto.precioCompra,
      producto.stock || 0,
      producto.estado !== undefined ? producto.estado : true
    ]);
    return this.findById(result.insertId);
  }

  /**
   * Actualiza un producto
   * @param {number} id - ID del producto
   * @param {Object} producto - Datos del producto
   * @returns {Promise<Producto>}
   */
  async update(id, producto) {
    const sql = `
      UPDATE producto 
      SET nombre = ?, descripcion = ?, precio_venta = ?, precio_compra = ?, stock = ?, estado = ?
      WHERE id = ?
    `;
    await execute(sql, [
      producto.nombre,
      producto.descripcion,
      producto.precioVenta,
      producto.precioCompra,
      producto.stock,
      producto.estado,
      id
    ]);
    return this.findById(id);
  }

  /**
   * Actualiza el stock de un producto
   * @param {number} id - ID del producto
   * @param {number} cantidad - Cantidad a agregar o restar
   * @returns {Promise<Producto>}
   */
  async updateStock(id, cantidad) {
    const sql = `
      UPDATE producto 
      SET stock = stock + ?
      WHERE id = ?
    `;
    await execute(sql, [cantidad, id]);
    return this.findById(id);
  }

  /**
   * Elimina un producto
   * @param {number} id - ID del producto
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const sql = 'DELETE FROM producto WHERE id = ?';
    const result = await execute(sql, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new ProductoRepository();
