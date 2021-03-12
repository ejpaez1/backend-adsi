import { Router } from "express";
import category from "../controllers/category.js";
import { check } from "express-validator"
import validationFields from "../middlewares/validations.js";
import helpers from "../db-helpers/category.js";

const router = Router();
//Obtener información por medio de palabras de un item
router.get("/", category.categoryGet);
//Obtener información por medio del ID de un item
router.get("/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpers.existCategoryById),
    validationFields
], category.categoryGetById);
//Insertar item
router.post("/", [
    check('name', 'Name is require').not().isEmpty(),
    check('name').custom(helpers.existCategoryByIdName),
    validationFields
], category.categoryAdd);
//Actualizar item
router.put("/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpers.existCategoryById),
    check('name').custom(helpers.existCategoryByIdName),
    validationFields
],category.categoryModify);
//Activar el estado de un item
router.put("/enable/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpers.existCategoryById),
    validationFields
],category.stateEnable);
//Desactivar el estado de un item
router.put("/disable/:id", category.stateDisable);
//Eliminar -> solo se desactiva
router.delete("/delete/:id", category.categoryDelete);

export default router;
