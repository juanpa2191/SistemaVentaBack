/**
 * Entity: Compra
 * Representa una compra en el sistema
 */
class Compra {
  constructor({ id, proveedor_id, fecha, total, estado }) {
    this.id = id;
    this.proveedorId = proveedor_id;
    this.fecha = fecha;
    this.total = parseFloat(total);
    this.estado = estado;
  }

  static fromDatabase(row) {
    return new Compra(row);
  }

  toJSON() {
    return {
      id: this.id,
      proveedorId: this.proveedorId,
      fecha: this.fecha,
      total: this.total,
      estado: this.estado
    };
  }
}

module.exports = Compra;
