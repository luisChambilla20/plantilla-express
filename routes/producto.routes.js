const { Router, request, response } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const { validarRoleAdmin } = require("../middlewares/validar-roles");
const {
  existeCategoria,
  existeProductoPorId,
  existeNombreProducto,
} = require("../helpers/db-validation");
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/producto.controller");

const router = Router();

// OPTENER TODOS LOS PRODUCTOS - PAGINADO - TOTAL
router.get("/", obtenerProductos);

// OBTENER PRODUCTO POR ID
router.get(
  "/:id",
  [
    check("id", "No es un ID valido en mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProductoPorId
);

// CREAR PRODUCTO - CUALQUIER USER CON TOKEN VALIDO
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("categoria", "La categoria es obligatoria").notEmpty(),
    validarCampos,
  ],
  crearProducto
);

// ACTUALIZAR CATEGORIA - CUALQUIER USER CON TOKEN VALIDO
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido en mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    check("nombre", "El nombre debe exsitir").notEmpty(),
    check("nombre").custom(existeNombreProducto),
    validarCampos,
  ],
  actualizarProducto
);

// BORRAR CATEGORIA - SOLO ADMIN - JWT
router.delete(
  "/:id",
  [
    validarJWT,
    validarRoleAdmin,
    check("id", "No es un ID valido en mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
