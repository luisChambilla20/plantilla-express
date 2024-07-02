const { Schema, model, Types } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

// DECIDIMOS ELIMINAR ALGUNOS DATOS AL MOMENTO DE LA RESPONSE PERO SIGUE EN LA DB
// CategoriaSchema.methods.toJSON = function () {
//   const { __v, _id, ...categoria } = this.toObject();
//   return { uid: _id, ...categoria };
// };

module.exports = model("Categoria", CategoriaSchema);
