/**
 * Interfaz para el repositorio de clientes
 * Define los métodos que debe implementar cualquier clase que actúe como repositorio de clientes
 */
class IClienteRepository {
  /**
   * Obtiene todos los clientes
   * @returns {Promise<Cliente[]>}
   */
  async getAllClientes() {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene un cliente por su ID
   * @param {number} id
   * @returns {Promise<Cliente | null>}
   */
  async getClienteById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Crea un nuevo cliente
   * @param {Cliente} cliente
   * @returns {Promise<Cliente>}
   */
  async createCliente(cliente) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza un cliente existente
   * @param {number} id
   * @param {Cliente} cliente
   * @returns {Promise<Cliente | null>}
   */
  async updateCliente(id, cliente) {
    throw new Error('Method not implemented');
  }

  /**
   * Elimina un cliente
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  async deleteCliente(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = IClienteRepository;