import { Router } from "express";
import {
  userAdd,
  userGet,
  userUpdate,
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
router.put("/:id", userUpdate);
//Eliminar usuario
router.delete("/:id", userDelete);
//Eliminar usuario
router.put("/enable/:id", stateEnable);
//Eliminar usuario
router.put("/disable/:id", stateDisable);

export default router;
