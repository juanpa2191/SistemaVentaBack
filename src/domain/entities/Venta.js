/**
 * Entity: Venta
 * Representa una venta en el sistema
 */
class Venta {
  constructor({ id, cliente_id, fecha, total, estado }) {
    this.id = id;
    this.clienteId = cliente_id;
    this.fecha = fecha;
    this.total = parseFloat(total);
    this.estado = estado;
  }

  static fromDatabase(row) {
    return new Venta(row);
  }

  toJSON() {
    return {
      id: this.id,
      clienteId: this.clienteId,
      fecha: this.fecha,
      total: this.total,
      estado: this.estado
    };
  }
}

module.exports = Venta;
