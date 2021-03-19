import { Router } from "express";
import sale from "../controllers/sale.js";

const router = Router();

/* //Obtener información por medio de palabras de un item
router.get("/", sale.categoryGet);
//Obtener información por medio del ID de un item
router.get("/:id", sale.categoryGetById);
//Insertar categoria
router.post("/", sale.categoryAdd);
//Actualizar categoria
router.put("/:id", sale.categoryModify);
//Activar el estado de un item
router.put("/enable/:id", sale.stateEnable);
//Desactivar categoria
router.put("/disable/:id", sale.stateDisable);
 */
export default router;