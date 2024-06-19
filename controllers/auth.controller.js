const { request, response } = require("express");

const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/generar-jwt");

const authPost = async (req = request, res = response) => {
  try {
    //VERIFICAR QUE EL CORREO EXISTE
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / password incorrecta - correo",
      });
    }

    //VERIFICAR EL ESTADO DEL USUARIO
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / password incorrecta - estado",
      });
    }

    //VERIFICAR LA CONTRASEÑA
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Usuario / password incorrecta - password",
      });
    }

    //GENERAR EL JWT
    const jwt = await generarJWT(usuario.id);

    res.json({
      msg: "Desde auth controller",
      usuario,
      jwt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Habla con el administrador",
    });
  }
};

module.exports = {
  authPost,
};
