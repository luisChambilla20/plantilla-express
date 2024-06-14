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

  console.log(existeId);

  if (!existeId) {
    throw new Error("El ID no existe en la DB");
  }
};

module.exports = { rolValido, emailExiste, existeUsuarioPorId };
