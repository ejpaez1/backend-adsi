import { Router } from "express";
import sale from "../controllers/sale.js";
import { check } from "express-validator";
import tokens from "../middlewares/token-jwt.js";
import validations from "../middlewares/validations.js";
import helpers from "../db-helpers/sale.js";

const router = Router();

router.get("/", [tokens.validateJWT], sale.get);

router.get(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  sale.getById
);
router.post(
  "/",
  [
    tokens.validateJWT,
    check("user", "Tipo persona es requerido").not().isEmpty(),
    check("person", "Nombre es requerido").not().isEmpty(),
    check("typeProof", "Documento es requerido").not().isEmpty(),
    check("serieProof", "ID Documento es requerida").not().isEmpty(),
    check("numProof", "Dirección es requerido").not().isEmpty(),
    check("total", "Dirección es requerido").not().isEmpty(),
    check("tax", "Celular es requerido").not().isEmpty(),
    check("details", "E-mail es requerido").not().isEmpty(),
/*     check("idDocument").custom(helpers.byIdDocument),
    check("phone").custom(helpers.byPhone),
    check("email").custom(helpers.byEmail), */
    validations,
  ],
  sale.add
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
  sale.modify
);
router.put(
  "/enable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  sale.enable
);
router.put(
  "/disable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  sale.disable
);

export default router;