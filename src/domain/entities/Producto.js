/**
 * Entity: Producto
 * Representa un producto en el sistema
 */
class Producto {
  constructor({ id, nombre, descripcion, precio_venta, precio_compra, stock, estado, created_at, updated_at }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioVenta = parseFloat(precio_venta);
    this.precioCompra = parseFloat(precio_compra);
    this.stock = stock;
    this.estado = estado;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }

  static fromDatabase(row) {
    return new Producto(row);
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precioVenta: this.precioVenta,
      precioCompra: this.precioCompra,
      stock: this.stock,
      estado: this.estado,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Producto;
