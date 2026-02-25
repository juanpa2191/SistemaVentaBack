/**
 * Interface: IProductoRepository
 * Define el contrato para el repositorio de productos
 */
class IProductoRepository {
  async findAll() {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async create(producto) {
    throw new Error('Method not implemented');
  }

  async update(id, producto) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async updateStock(id, cantidad) {
    throw new Error('Method not implemented');
  }
}

module.exports = IProductoRepository;
