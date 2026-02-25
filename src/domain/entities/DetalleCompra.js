/**
 * Entity: DetalleCompra
 * Representa el detalle de una compra en el sistema
 */
class DetalleCompra {
  constructor({ id, compra_id, producto_id, cantidad, precio_unitario, subtotal }) {
    this.id = id;
    this.compraId = compra_id;
    this.productoId = producto_id;
    this.cantidad = cantidad;
    this.precioUnitario = parseFloat(precio_unitario);
    this.subtotal = parseFloat(subtotal);
  }

  static fromDatabase(row) {
    return new DetalleCompra(row);
  }

  toJSON() {
    return {
      id: this.id,
      compraId: this.compraId,
      productoId: this.productoId,
      cantidad: this.cantidad,
      precioUnitario: this.precioUnitario,
      subtotal: this.subtotal
    };
  }
}

module.exports = DetalleCompra;
