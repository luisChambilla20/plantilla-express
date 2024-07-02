const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const Rol = require("../models/rol");
const Usuario = require("../models/usuario");

const rolValido = async (rol = "") => {
  const existeRole = await Rol.findOne({ rol });
  if (!existeRole) {
    throw new Error(`El rol ${rol} no existe en la DB`);
  }
};

const emailExiste = async (correo = "") => {
  // VERIFICAR SI EL CORREO EXISTE
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error("El correo ya existe");
  }
};

const existeUsuarioPorId = async (id = "") => {
  // VERIFICAR SI EL ID EXISTE
  const existeId = await Usuario.findById(id);

  if (!existeId) {
    throw new Error("El ID no existe en la DB");
  }
};

const existeCategoria = async (id = "") => {
  const categoria = await Categoria.findById(id);

  if (!categoria) {
    throw new Error("El id no existe en la DB");
  }

  if (!categoria.estado) {
    throw new Error("Categoria inactiva - hable con el administrador");
  }
};

const existeProductoPorId = async (id = "") => {
  const producto = await Producto.findById(id);

  if (!producto) {
    throw new Error("El id no existe en la DB");
  }

  if (!producto.estado) {
    throw new Error("Producto inactivo - hable con el administrador");
  }
};

const existeNombreProducto = async (nombre = "") => {
  const productoDB = await Producto.findOne({ nombre: nombre.toUpperCase() });

  console.log(productoDB);

  if (productoDB) {
    throw new Error("Nombre invalido para actualizar producto");
  }
};

const coleccionPermitida = (coleccion = "", coleccionesPermitidas = []) => {
  const incluida = coleccionesPermitidas.includes(coleccion);

  if (!incluida) {
    throw new Error("Coleccion no permitida");
  }

  return true;
};

module.exports = {
  rolValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoria,
  existeProductoPorId,
  existeNombreProducto,
  coleccionPermitida,
};
