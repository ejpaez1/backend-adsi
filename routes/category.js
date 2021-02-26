import { Router } from "express";
import { categoryGet } from "../controllers/category.js";

const router = Router();

router.get("/", categoryGet);

router.get("/:id");

router.post("/");

router.put("/");

router.put("/enable/:id");

router.put("/disable/:id");

router.delete("/:id");

export default router