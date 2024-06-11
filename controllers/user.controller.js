const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
  // CAPTURA LOS QUERY DE UN GET http://localhost:8080/api/users?cada=1&page=11
  const query = req.query;

  res.json({
    msg: "Desde get controller",
    query,
  });
};

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: "Desde post controller",
    nombre,
    edad,
  });
};

const usuariosPut = (req = request, res = response) => {
  // LOS DATOS ENVIADOS EN LA RUTA RUTA/10 SE CAMPURAN DE LA SIGUIENTE MANERA
  const { id } = req.params;

  res.json({
    msg: "Desde put controller",
    id,
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "Desde patch controller",
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "Desde delete controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  usuariosPut,
};
