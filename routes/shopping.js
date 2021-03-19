import { Router } from "express";
import shopping from "../controllers/shopping.js";

const router = Router();
/* 
//Obtener información por medio de palabras de un item
router.get("/", shopping);
//Obtener información por medio del ID de un item
router.get("/:id", shopping);
//Insertar categoria
router.post("/", shopping);
//Actualizar categoria
router.put("/:id", shopping);
//Activar el estado de un item
router.put("/enable/:id", shopping);
//Desactivar categoria
router.put("/disable/:id", shopping); */


export default router;