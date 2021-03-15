import { Router } from "express";
import { check } from "express-validator";
import user from "../controllers/user.js";
import helpers from "../db-helpers/user.js";
import tokens from "../middlewares/token-jwt.js";
import validations from "../middlewares/validations.js";

const router = Router();
//Obtener usuario
router.get("/", [tokens.validateJWT], user.userGet);
//Obtener usuario por ID
router.get(
  "/:id",
  [
    tokens.validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpers.userById),
    validations
  ],
  user.userGetById
);
//Añadir usuario
router.post("/", [
  check("email", "Email is require").not().isEmpty(),
  check('email').custom(helpers.userEmail)
], user.userAdd);
//Modificar usuario
router.put("/:id", user.userUpdate);
//activar usuario
router.put("/enable/:id", user.stateEnable);
//desactivar usuario
router.put("/disable/:id", user.stateDisable);

export default router;
