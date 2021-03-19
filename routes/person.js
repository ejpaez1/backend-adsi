import { Router } from "express";
import person from "../controllers/person.js";

const router = Router();

/* //Obtener información por medio de palabras de un item
router.get("/", person.categoryGet);
//Obtener información por medio del ID de un item
router.get("/:id", person.categoryGetById);
//Insertar categoria
router.post("/", person.categoryAdd);
//Actualizar categoria
router.put("/:id", person.categoryModify);
//Activar el estado de un item
router.put("/enable/:id", person.stateEnable);
//Desactivar categoria
router.put("/disable/:id", person.stateDisable); */

export default router;