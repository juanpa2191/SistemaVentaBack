const {query, execute, getConection} = require('../../config/database.config');
const Cliente = require('../../domain/entities/Cliente');

/**
 * Repository: ClienteRepository
 * Implementación del repositorio de clientes
 */
class ClienteRepository {
  /**
   * Obtiene todos los clientes
   * @return {Promise<Cliente[]>}
   */
  async findAll() {
    const sql = 'SELECT * FROM cliente ORDER BY id DESC';
    const rows = await query(sql);
    return rows.map(row => Cliente.fromDatabase(row));
  }

    /**
     * Obtiene un cliente por ID
     * @param {number} id - ID del cliente
     * @return {Promise<Cliente|null>}
     */
    async findById(id) {
      const sql = 'SELECT * FROM cliente WHERE id = ?';
      const rows = await query(sql, [id]);
      return rows.length > 0 ? Cliente.fromDatabase(rows[0]) : null;
    }

    /**
     * Crea un nuevo cliente
     * @param {Object} cliente - Datos del cliente
     * @return {Promise<Cliente>}   
     * */
    async create(cliente) {
      const sql = `
        INSERT INTO cliente (nombre, tipo_doc, doc_id, email, telefono)
        VALUES (?, ?, ?, ?, ?)
      `;
      const rows = await query(sql, [
        cliente.nombre, 
        cliente.tipo_doc, 
        cliente.doc_id, 
        cliente.email, 
        cliente.telefono]);
        return this.findById(rows.insertId);
    }

    /** 
     * Actualiza un cliente
     * @param {number} id - ID del cliente
     * @param {Object} cliente - Datos del cliente
     * @return {Promise<Cliente>}
     */
    async update(id, cliente) {
      const sql = `
        UPDATE cliente
        SET nombre = ?, tipo_doc = ?, doc_id = ?, email = ?, telefono = ?
        WHERE id = ?
      `;
      await query(sql, [
        cliente.nombre,
        cliente.tipo_doc,
        cliente.doc_id,
        cliente.email,
        cliente.telefono,
        id
      ]);
      return this.findById(id);
    }

    /**
     * Elimina un cliente
     * @param {number} id - ID del cliente
     * @return {Promise<boolean>}
     * */
    async delete(id) {
      const sql = 'DELETE FROM cliente WHERE id = ?';
      const result = await query(sql, [id]);
      return result.affectedRows > 0;
    }
}   

module.exports = new ClienteRepository();
