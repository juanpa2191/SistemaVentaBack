/**
 * Entity: Cliente
 * Representa un cliente en el sistema
 */
class Cliente {
  constructor({ id, nombre, email, telefono, direccion, created_at, updated_at }) {
    this.id = id;
    this.nombre = nombre;
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
      email: this.email,
      telefono: this.telefono,
      direccion: this.direccion,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Cliente;
