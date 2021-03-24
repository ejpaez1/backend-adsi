import { Router } from "express";
import category from "../controllers/category.js";
import { check } from "express-validator";
import validations from "../middlewares/validations.js";
import helpers from "../db-helpers/category.js";
import tokens from "../middlewares/token-jwt.js";

const router = Router();
router.get("/", [tokens.validateJWT], category.get);
router.get(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  category.getById
);
router.post(
  "/",
  [
    tokens.validateJWT,
    check("name", "El nombre es requerido").not().isEmpty(),
    check("description", "La descripción es requerida").not().isEmpty(),
    check("name").custom(helpers.byName),
    validations,
  ],
  category.add
);
router.put(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    check("name").custom(helpers.byName)
  ],
  category.modify
);
router.put(
  "/enable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  category.enable
);
router.put(
  "/disable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  category.disable
);
export default router;
