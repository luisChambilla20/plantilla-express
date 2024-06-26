const { type } = require("express/lib/response");
const { Schema, model, Types } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

// DECIDIMOS ELIMINAR ALGUNOS DATOS AL MOMENTO DE LA RESPONSE PERO SIGUE EN LA DB
ProductoSchema.methods.toJSON = function () {
  const { __v, estado, _id, ...data } = this.toObject();
  return { uid: _id, ...data };
};

module.exports = model("Producto", ProductoSchema);
