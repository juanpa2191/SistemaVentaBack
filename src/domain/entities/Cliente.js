/**
 * Entity: Cliente
 * Representa un cliente en el sistema
 */
class Cliente {
  constructor({ id, nombre, tipo_doc, doc_id,  email, telefono, direccion, created_at, updated_at }) {
    this.id = id;
    this.nombre = nombre;
    this.tipoDoc = tipo_doc;
    this.docId = doc_id;
    this.email = email;
    this.telefono = telefono;
    this.direccion = direccion;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }

  static fromDatabase(row) {
    return new Cliente(row);
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      tipo_doc: this.tipoDoc,
      doc_id: this.docId,
      email: this.email,
      telefono: this.telefono,
      direccion: this.direccion,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Cliente;
