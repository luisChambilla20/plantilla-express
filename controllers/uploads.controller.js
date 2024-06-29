const { request, response } = require("express");
const subirArchivoHelper = require("../helpers/subir-archivos");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");
const path = require("path");
const fs = require("fs");

const subirArchivo = async (req = request, res = response) => {
  try {
    const nombreTemp = await subirArchivoHelper(
      req.files,
      ["txt", "jpg"],
      "textos"
    );

    res.status(201).json({
      nombreTemp,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const editarImagen = async (req = request, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: "No existe el usuario",
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: "No existe el producto",
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Error de validación de colección - hable con el administrador",
      });
  }

  try {
    // EN CASO YA TENGO UNA IMAGEN REGISTRADA
    if (modelo.img) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.img
      );

      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }

    const nombreTemp = await subirArchivoHelper(
      req.files,
      ["jpg", "png", "jpge", "gif"],
      coleccion
    );

    modelo.img = nombreTemp;

    await modelo.save();

    res.status(201).json({
      modelo,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const mostrarImagen = async (req = request, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: "No existe el usuario",
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: "No existe el producto",
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Error de validación de colección - hable con el administrador",
      });
  }

  try {
    // EN CASO YA TENGO UNA IMAGEN REGISTRADA
    if (modelo.img) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.img
      );

      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen);
      }
    }

    res.status(200).json({
      msg: "Sin datos del archivo",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

module.exports = { subirArchivo, editarImagen, mostrarImagen };
