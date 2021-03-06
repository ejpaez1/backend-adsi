import { Router } from "express";
import auth from "../controllers/authentication.js";

const router = Router();

router.put("/login", auth.login);

export default router;
