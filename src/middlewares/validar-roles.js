const { request, response } = require("express");

const validarRoleAdmin = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere validar el rol sin validar el token primero",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador para borrar algun usuario`,
    });
  }

  next();
};

const tieneRol = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se requiere verificar el role sin validar el token primero",
      });
    }

    console.log( roles.includes(req.usuario.rol));

    if (roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El registro requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = { validarRoleAdmin, tieneRol };
