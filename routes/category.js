import { Router } from "express";
import {
  categoryGet,
  categoryAdd,
  categoryGetById,
  categoryModify,
  stateEnable,
  stateDisable,
  categoryDelete,
} from "../controllers/category.js";

const router = Router();
//Obtener información por medio de palabras de un item
router.get("/", categoryGet);
//Obtener información por medio del ID de un item
router.get("/:id", categoryGetById);
//Insertar item
router.post("/", categoryAdd);
//Actualizar item
router.put("/:id", categoryModify);
//Activar el estado de un item
router.put("/enable/:id", stateEnable);
//Desactivar el estado de un item
router.put("/disable/:id", stateDisable);
//Eliminar -> solo se desactiva
router.delete("/delete/:id", categoryDelete);

export default router;
