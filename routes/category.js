import { Router } from "express";
import { categoryGet, categoryPost, categoryById } from "../controllers/category.js";

const router = Router();

router.get("/", categoryGet);

router.get("/:id", categoryById);

router.post("/", categoryPost);

router.put("/");

router.put("/enable/:id");

router.put("/disable/:id");

router.delete("/:id");

export default router