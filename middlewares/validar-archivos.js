const { response, request } = require("express");

const validarArchivos = (req = request, res = response, next) => {
  // Verificar si files y sampleFile existen
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      msg: "No existen archivos",
    });
  }

  next();
};

module.exports = validarArchivos;
