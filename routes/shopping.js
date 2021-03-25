
import { Router } from "express";
import shopping from "../controllers/shopping.js";
import { check } from "express-validator";
import tokens from "../middlewares/token-jwt.js";
import validations from "../middlewares/validations.js";
import helpers from "../db-helpers/shopping.js";
import helpersUser from "../db-helpers/user.js";
import helpersPerson from "../db-helpers/person.js";

const router = Router();

router.get("/", [tokens.validateJWT], shopping.get);

router.get(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
  ],
  shopping.getById
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
    check("details", "Detalles es requerido").not().isEmpty(),
    check("user").custom(helpersUser.userById),
    check("person").custom(helpersPerson.byId),
    validations,
  ],
  shopping.add
);
router.put(
  "/enable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  shopping.enable
);
router.put(
  "/disable/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.byId),
    validations,
  ],
  shopping.disable
);

export default router;