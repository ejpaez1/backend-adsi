import { Router } from "express";
import {
  userAdd,
  userGet,
  userModify,
  userDelete,
  userGetById,
  stateEnable,
  stateDisable
} from "../controllers/user.js";

const router = Router();
//Obtener usuario
router.get("/", userGet);
//Obtener usuario por ID
router.get("/:id", userGetById);
//Añadir usuario
router.post("/", userAdd);
//Modificar usuario
router.put("/:id", userModify);
//Eliminar usuario
router.delete("/:id", userDelete);
//Eliminar usuario
router.put("/enable/:id", stateEnable);
//Eliminar usuario
router.put("/disable/:id", stateDisable);

export default router;
