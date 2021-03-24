import { Router } from "express";
import article from "../controllers/article.js";
import { check } from "express-validator";
import tokens from "../middlewares/token-jwt.js";
import validations from "../middlewares/validations.js";
import helpers from "../db-helpers/article.js";

const router = Router();

router.get("/", [tokens.validateJWT], article.get);
router.get(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  article.getById
);
router.post(
  "/",
  [
    tokens.validateJWT,
    check("category", "Categoria es requerida").not().isEmpty(),
    check("code", "Codigo es requerido").not().isEmpty(),
    check("name", "Nombre es requerido").not().isEmpty(),
    check("description", "Descripción es requerida").not().isEmpty(),
    check("price", "Precio es requerido").not().isEmpty(),
    check("stock", "Stock es requerido").not().isEmpty(),
    check("name").custom(helpers.byName),
    check("code").custom(helpers.byCode),
    validations,
  ],
  article.add
);
router.put(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    check("name").custom(helpers.byName),
    check("code").custom(helpers.byCode),
    validations
  ],
  article.modify
);
router.put(
  "/enable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  article.enable
);
router.put(
  "/disable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  article.disable
);

export default router;
