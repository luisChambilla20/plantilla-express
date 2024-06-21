const { request, response } = require("express");

const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/generar-jwt");
const { verifyGoogle } = require("../helpers/google-verify");

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

const googleSigIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, correo, img } = await verifyGoogle(id_token);

    let usuario = await Usuario.findOne({ correo });

    // VERIFICAR SU EXISTENCIA
    if (!usuario) {
      const data = {
        nombre,
        correo,
        rol: "USER_ROLE",
        password: ":P",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    //VERIFICAR SU ESTADO ACTIVO
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Habla con el administrador",
      });
    }

    // GENERAR EL TOKEN
    const jwt = await generarJWT(usuario.id);

    res.json({
      msg: "Token recibido",
      usuario,
      jwt,
    });
  } catch (error) {
    res.status(400).json({
      msg: "El token no se pudo verificar",
      ok: false,
    });
  }
};

module.exports = {
  authPost,
  googleSigIn,
};
