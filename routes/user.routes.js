const { Router } = require("express");

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

const { check } = require("express-validator");
const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "Formato de correo invalido").isEmail(),
    check("correo").custom(emailExiste),
    check("password", "Minimo 6 valores").isLength({ min: 6 }),
    // check("rol", "Rol invalido").isIn(["ADMIN_ROL", "USER_ROL"]),
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
    check("id", "No es un ID válido de mongo").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
