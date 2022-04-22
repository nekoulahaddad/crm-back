import express from "express";
const router = express.Router();
import {
  addMainCategory,
} from "../controllers/mainCategoryController";

router.post('/add', addMainCategory)

export default router;
