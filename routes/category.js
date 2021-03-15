import { Router } from "express";
import category from "../controllers/category.js";
import { check } from "express-validator";
import validations from "../middlewares/validations.js";
import helpers from "../db-helpers/category.js";
import tokens from "../middlewares/token-jwt.js";

const router = Router();
//Obtener información por medio de palabras de un item
router.get("/", [tokens.validateJWT], category.categoryGet);
//Obtener información por medio del ID de un item
router.get(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  category.categoryGetById
);
//Insertar categoria
router.post(
  "/",
  [
    check("name", "El nombre es requerido").not().isEmpty(),
    check("description", "La descripción es requerida").not().isEmpty(),
    check("name").custom(helpers.byName),
    validations,
  ],
  category.categoryAdd
);
//Actualizar categoria
router.put(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    check("name").custom(helpers.name)
  ],
  category.categoryModify
);
//Activar el estado de un item
router.put(
  "/enable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  category.stateEnable
);
//Desactivar categoria
router.put(
  "/disable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  category.stateDisable
);

/* //Eliminar -> solo se desactiva
router.delete("/delete/:id" [
  check('id', 'No es un ID válido').isMongoId(),
  check().custom(helpers.existCategoryByIdName)
], category.categoryDelete);
 */
export default router;
