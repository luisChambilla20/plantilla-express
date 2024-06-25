const { Router, request, response } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  crearCategoria,
  obtenerCategoriaId,
  obtenerCategorias,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categoria.controller");

const { validarRoleAdmin, tieneRol } = require("../middlewares/validar-roles");
const { existeCategoria } = require("../helpers/db-validation");

const router = Router();

// OPTENER TODAS LAS CATEGORIAS - PAGINADO - TOTAL
router.get("/", obtenerCategorias);

// OBTENER CATEGORIA POR ID
router.get(
  "/:id",
  [
    check("id", "No es un ID valido en mongo").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  obtenerCategoriaId
);

// CREAR CATEGORIA - CUALQUIER USER CON TOKEN VALIDO
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// ACTUALIZAR CATEGORIA - CUALQUIER USER CON TOKEN VALIDO
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido en mongo").isMongoId(),
    check("id").custom(existeCategoria),
    check("nombre", "El nombre debe exsitir").notEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

// BORRAR CATEGORIA - SOLO ADMIN - JWT
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido en mongo").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
