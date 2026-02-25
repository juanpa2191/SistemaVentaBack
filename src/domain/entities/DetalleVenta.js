/**
 * Entity: DetalleVenta
 * Representa el detalle de una venta en el sistema
 */
class DetalleVenta {
  constructor({ id, venta_id, producto_id, cantidad, precio_unitario, subtotal }) {
    this.id = id;
    this.ventaId = venta_id;
    this.productoId = producto_id;
    this.cantidad = cantidad;
    this.precioUnitario = parseFloat(precio_unitario);
    this.subtotal = parseFloat(subtotal);
  }

  static fromDatabase(row) {
    return new DetalleVenta(row);
  }

  toJSON() {
    return {
      id: this.id,
      ventaId: this.ventaId,
      productoId: this.productoId,
      cantidad: this.cantidad,
      precioUnitario: this.precioUnitario,
      subtotal: this.subtotal
    };
  }
}

module.exports = DetalleVenta;
