
import { Router } from "express";
import sale from "../controllers/sale.js";
import { check } from "express-validator";
import tokens from "../middlewares/token-jwt.js";
import validations from "../middlewares/validations.js";
import helpers from "../db-helpers/sale.js";
import helpersUser from "../db-helpers/user.js";
import helpersPerson from "../db-helpers/person.js";

const router = Router();

router.get("/", [tokens.validateJWT], sale.get);

router.get(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
  ],
  sale.getById
);

router.post(
  "/",
  [
    tokens.validateJWT,
    check("user", "Tipo persona es requerido").not().isEmpty(),
    check("user", "Tipo persona es requerido").isMongoId(),
    check("person", "Nombre es requerido").not().isEmpty(),
    check("person", "Nombre es requerido").isMongoId(),
    check("typeProof", "Documento es requerido").not().isEmpty(),
    check("serieProof", "ID Documento es requerida").not().isEmpty(),
    check("numProof", "Dirección es requerido").not().isEmpty(),
    check("details", "Details es requerido").not().isEmpty(),
    check("user").custom(helpersUser.userById),
    check("person").custom(helpersPerson.byId),
    validations,
  ],
  sale.add
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