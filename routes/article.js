import { Router } from "express";
import article from "../controllers/article.js";

const router = Router();

//Obtener información por medio de palabras de un item
/* router.get("/", article);
//Obtener información por medio del ID de un item
router.get("/:id", article);
//Insertar categoria
router.post("/", article);
//Actualizar categoria
router.put("/:id", article);
//Activar el estado de un item
router.put("/enable/:id", article);
//Desactivar categoria
router.put("/disable/:id", article); */

export default router;
