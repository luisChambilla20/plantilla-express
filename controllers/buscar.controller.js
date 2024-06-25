const { request, response } = require("express");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const Rol = require("../models/rol");
const { ObjectId } = require("mongoose").Types;

const coleccionPermitida = ["categorias", "productos", "roles", "usuarios"];

const buscarUsuario = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  //   CONVIERTE A UNA EXPRESION REGULAR PARA OBVIAR MAYUSCULAS
  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  //   CONVIERTE A UNA EXPRESION REGULAR PARA OBVIAR MAYUSCULAS
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex });

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const producto = await Producto.findById(termino);
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  //   CONVIERTE A UNA EXPRESION REGULAR PARA OBVIAR MAYUSCULAS
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({ nombre: regex });

  res.json({
    results: productos,
  });
};
const buscarRoles = async (termino = "", res) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const rol = await Rol.findById(termino);
    return res.json({
      results: rol ? [rol] : [],
    });
  }

  //   CONVIERTE A UNA EXPRESION REGULAR PARA OBVIAR MAYUSCULAS
  const regex = new RegExp(termino, "i");

  const roles = await Rol.find({ rol: regex });

  res.json({
    results: roles,
  });
};

const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionPermitida.includes(coleccion)) {
    res.status(400).json({
      msg: "No permitida",
    });
  }

  switch (coleccion) {
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    case "roles":
      buscarRoles(termino, res);
      break;
    case "usuarios":
      buscarUsuario(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Catregoria no validada - hable con el administrador",
      });
      break;
  }
};

module.exports = { buscar };
