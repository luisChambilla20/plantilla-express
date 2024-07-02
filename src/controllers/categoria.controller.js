const { request, response } = require("express");

const Categoria = require("../models/categoria");

// OBTENER CATEGORIAS - PAGINADO - TOTAL - POPULATE
const obtenerCategorias = async (req = request, res = response) => {
  const query = { estado: true };
  const { limite = 5 } = req.query;

  try {
    const [total, categorias] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query).populate("usuario").limit(Number(limite)),
    ]);

    res.status(200).json({
      total,
      categorias,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor, hable con el administrador",
    });
  }
};

// OBTENER CATEGORIA - POPULATE
const obtenerCategoriaId = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findById(id).populate("usuario");

    res.status(200).json({
      msg: "LLego Id valido",
      categoria,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error en el servidor - hable con el administrador",
    });
  }
};

// CREA UNA CATEGORIA
const crearCategoria = async (req = request, res = response) => {
  // CONVIERTE A MAYUSCULA
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  // EN CASO YA EXISTA SE NIEGA LA CREACION
  if (categoriaDB) {
    return res.status(401).json({
      msg: `Categoria ${nombre} ya existe en la DB`,
    });
  }

  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  categoria.save();

  res.status(201).json({
    msg: "Categoria creada correctamente",
    categoria,
  });
};

// ACTUALIZA UNA CATEGORIA - NOMBRE - JWT
const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body.toUpperCase();

  try {
    const categoria = await Categoria.findByIdAndUpdate(id, { nombre: nombre });

    res.status(200).json({
      categoria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo actualizar el nombre",
    });
  }
};

// BORRA CATEGORIA - JWT - ADMIN
const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const query = { estado: false };

  try {
    if (req.usuario.rol !== "ADMIN_ROLE") {
      return res.status(401).json({
        cat: req.usuario,
        msg: "Usuario no valido para esta funcion",
      });
    }

    const categoria = await Categoria.findByIdAndUpdate(id, query);

    res.status(200).json({
      categoria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo eliminar la categoria",
    });
  }
};

module.exports = {
  crearCategoria,
  obtenerCategoriaId,
  obtenerCategorias,
  actualizarCategoria,
  borrarCategoria,
};
