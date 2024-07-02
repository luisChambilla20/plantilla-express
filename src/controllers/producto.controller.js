const { request, response } = require("express");

const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

// OBTENER PRODUCTOS - PAGINADO - TOTAL - POPULATE
const obtenerProductos = async (req = request, res = response) => {
  const query = { estado: true };
  const { limite = 5 } = req.query;

  try {
    const [total, productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
        .populate("usuario", "nombre correo rol google")
        .populate("categoria", "nombre estado")
        .limit(Number(limite)),
    ]);

    res.status(200).json({
      total,
      productos,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor, hable con el administrador",
    });
  }
};

// OBTENER PRODUCTO - POPULATE
const obtenerProductoPorId = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findById(id)
      .populate("usuario", "nombre correo rol google")
      .populate("categoria", "nombre estado");

    res.status(200).json({
      msg: "LLego Id valido",
      producto,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error en el servidor - hable con el administrador",
    });
  }
};

// CREA UN PRODUCTO
const crearProducto = async (req = request, res = response) => {
  // CONVIERTE A MAYUSCULA
  const nombre = req.body.nombre.toUpperCase();
  const categoria = req.body.categoria.toUpperCase();

  try {
    const [productoDB, categoriaDB] = await Promise.all([
      Producto.findOne({ nombre }),
      Categoria.findOne({ nombre: categoria }),
    ]);

    // EN CASO YA EXISTA SE NIEGA LA CREACION
    if (productoDB) {
      return res.status(401).json({
        msg: `Producto ${nombre} ya existe en la DB`,
      });
    }

    if (!categoriaDB) {
      return res.status(401).json({
        msg: `Categoria ${categoria} no existe en la DB`,
      });
    }

    const data = {
      nombre,
      usuario: req.usuario._id,
      categoria: categoriaDB._id,
    };

    const producto = new Producto(data);

    producto.save();

    res.status(201).json({
      msg: "Producto creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).status({
      msg: "Comunicate con el administrador",
    });
  }
};

// ACTUALIZA UNA CATEGORIA - NOMBRE - JWT
const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();

  try {
    const producto = await Producto.findByIdAndUpdate(id, { nombre: nombre });

    console.log(producto);
    res.status(200).json({
      producto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo actualizar el nombre",
    });
  }
};

// BORRA PRODUCTO - JWT - ADMIN
const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const query = { estado: false };
  try {
    const producto = await Producto.findByIdAndUpdate(id, query);
    res.status(200).json({
      producto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo eliminar la categoria",
    });
  }
};

module.exports = {
  crearProducto,
  obtenerProductoPorId,
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
};
