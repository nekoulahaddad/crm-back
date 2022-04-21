import express from "express";
const router = express.Router();
import { addCategory, deleteCategory, changeSeo } from "../controllers/categoryController.js";

router.post("/add", addCategory)
router.delete('/delete/:id', deleteCategory)
router.patch('/seo/change/:id', changeSeo)

export default router;
