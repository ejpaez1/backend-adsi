import { Router } from "express";
import category from "../controllers/category.js";

const router = Router();
//Obtener información por medio de palabras de un item
router.get("/", category.categoryGet);
//Obtener información por medio del ID de un item
router.get("/:id", category.categoryGetById);
//Insertar item
router.post("/", category.categoryAdd);
//Actualizar item
router.put("/:id", category.categoryModify);
//Activar el estado de un item
router.put("/enable/:id", category.stateEnable);
//Desactivar el estado de un item
router.put("/disable/:id", category.stateDisable);
//Eliminar -> solo se desactiva
router.delete("/delete/:id", category.categoryDelete);

export default router;
