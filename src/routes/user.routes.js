const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {
  rolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validation");
const {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  usuariosPut,
} = require("../controllers/user.controller");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarRoleAdmin, tieneRol } = require("../middlewares/validar-roles");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "Formato de correo invalido").isEmail(),
    check("correo").custom(emailExiste),
    check("password", "Minimo 6 valores").isLength({ min: 6 }),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido de mongo").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  usuariosPut
);

router.patch("/", usuariosPatch);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRol("VENTAS_ROLE"),
    check("id", "No es un ID válido de mongo").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
