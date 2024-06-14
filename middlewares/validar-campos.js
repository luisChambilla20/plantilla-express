const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors); // Modificado para devolver un array de errores
  }

  next();
};

module.exports = { validarCampos };
