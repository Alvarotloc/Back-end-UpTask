import express from "express";
import {
  registrarUsuario,
  logarUsuario,
  confirmarUsuario,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//* Creación, Registro y Confirmación de usuarios

router.post("/", registrarUsuario); //* Crea un nuevo usuario
router.post("/login", logarUsuario);
router.get("/confirmar/:token", confirmarUsuario);
router.post("/olvide-password", olvidePassword);

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
router.get('/perfil', checkAuth, perfil);

export default router;
