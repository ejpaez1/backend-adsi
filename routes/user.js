import { Router } from "express";
import user from "../controllers/user.js";

const router = Router();
//Obtener usuario
router.get("/", user.userGet);
//Obtener usuario por ID
router.get("/:id", user.userGetById);
//Añadir usuario
router.post("/", user.userAdd);
//Modificar usuario
router.put("/:id", user.userUpdate);
//activar usuario
router.put("/enable/:id", user.stateEnable);
//desactivar usuario
router.put("/disable/:id", user.stateDisable);

export default router;
