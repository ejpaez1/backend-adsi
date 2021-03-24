import { Router } from "express";
import person from "../controllers/person.js";
import { check } from "express-validator";
import tokens from "../middlewares/token-jwt.js";
import validations from "../middlewares/validations.js";
import helpers from "../db-helpers/person.js";

const router = Router();

router.get("/", [tokens.validateJWT], person.get);

router.get(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  person.getById
);
router.post(
  "/",
  [
    check("typePerson", "Tipo persona es requerido").not().isEmpty(),
    check("name", "Nombre es requerido").not().isEmpty(),
    check("document", "Documento es requerido").not().isEmpty(),
    check("idDocument", "ID Documento es requerida").not().isEmpty(),
    check("address", "Dirección es requerido").not().isEmpty(),
    check("phone", "Celular es requerido").not().isEmpty(),
    check("email", "E-mail es requerido").not().isEmpty(),
    check("idDocument").custom(helpers.byIdDocument),
    check("phone").custom(helpers.byPhone),
    check("email").custom(helpers.byEmail),
    validations,
  ],
  person.add
);
router.put(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    check("idDocument").custom(helpers.byIdDocument),
    check("phone").custom(helpers.byPhone),
    check("email").custom(helpers.byEmail),
    validations
  ],
  person.modify
);
router.put(
  "/enable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  person.enable
);
router.put(
  "/disable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  person.disable
);

export default router;