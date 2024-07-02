const { Router } = require("express");
const {
  subirArchivo,
  editarImagen,
  mostrarImagen,
} = require("../controllers/uploads.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { coleccionPermitida } = require("../helpers/db-validation");
const validarArchivos = require("../middlewares/validar-archivos");

const router = Router();

router.post("/", validarArchivos, subirArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivos,
    check("id", "Tiene que ser Id de mongo válido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionPermitida(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  editarImagen
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "Tiene que ser Id de mongo válido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionPermitida(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

module.exports = router;
