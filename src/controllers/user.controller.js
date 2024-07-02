const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { validationResult } = require("express-validator");

const usuariosGet = async (req = request, res = response) => {
  // CAPTURA LOS QUERY DE UN GET http://localhost:8080/api/users?cada=1&page=11
  const { limite = 11, desde = 0 } = req.query;
  const query = { estado: true };

  // AMBAS SOLICITUDES SE EJECUTAN EN FORMA DISPAREJA
  // const usuarios = await Usuario.find()
  // .skip(Number(desde))
  //   .limit(Number(limite));

  // const usuariosCount = await Usuario.countDocuments();

  //REALIZA AMBAS PROMESAS EN SIMULTANEO
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  // LEER ERROR ENVIADOS DE LAS RUTAS
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.errors,
    });
  }

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // VERIFICAR CONTRASEÑA

  // ENCRIPTAR CONTRASÑA
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // GUARDAR EN LA DB
  await usuario.save();

  res.json({
    msg: "Desde post controller",
    usuario,
  });
};

const usuariosPut = async (req = request, res = response) => {
  // LOS DATOS ENVIADOS EN LA RUTA RUTA/10 SE CAMPURAN DE LA SIGUIENTE MANERA
  const { id } = req.params;

  // EL _ID ES LA LA DB
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    // ENCRIPTAR CONTRASÑA
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "Desde put controller",
    usuario,
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "Desde patch controller",
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  //ELIMINAR POR ID
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  usuariosPut,
};
