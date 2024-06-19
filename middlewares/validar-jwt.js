const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  // CAPTURA DE LOS HEADERS
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Usuarion inexistente en la DB",
      });
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Usuario deshabilitado",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: "Token enviado invalido",
    });
  }
};

module.exports = {
  validarJWT,
};
