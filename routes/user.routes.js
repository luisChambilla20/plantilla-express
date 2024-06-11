const { Router } = require("express");
const {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  usuariosPut,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", usuariosGet);
router.post("/", usuariosPost);
router.patch("/", usuariosPatch);
router.put("/:id", usuariosPut);
router.delete("/", usuariosDelete);

module.exports = router;
