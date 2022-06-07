import express from "express";
import {
  addCategory,
  toggleVisible
} from "../controllers/shopCategoryController";
const router = express.Router();

router.post('/add', addCategory);
router.patch('/toggleVisible', toggleVisible);

export default router;
