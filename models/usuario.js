const { Schema, model } = require("mongoose");

// SE CREA LA ESTRUCTURA DE LA TABLA
const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROL", "USER_ROL"],
    default: "USER_ROLE",
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// DECIDIMOS ELIMINAR ALGUNOS DATOS AL MOMENTO DE LA RESPONSE PERO SIGUE EN LA DB
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();

  const user = { uid: _id, ...usuario };

  return user;
};

module.exports = model("Usuario", UsuarioSchema);
