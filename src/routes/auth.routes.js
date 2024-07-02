const { Router } = require("express");
const { check } = require("express-validator");

const { authPost, googleSigIn } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validarCampos,
  ],
  authPost
);
router.post(
  "/google",
  [check("id_token", "El token es obligatorio").notEmpty(), validarCampos],
  googleSigIn
);

module.exports = router;
