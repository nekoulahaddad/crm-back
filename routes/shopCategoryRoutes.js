import express from "express";
import {
  addCategory,
  deleteCategory,
  toggleVisible
} from "../controllers/shopCategoryController";
import {checkPartner} from "../middlewares/auth";
const router = express.Router();

router.post('/add', addCategory);
router.patch('/toggleVisible', toggleVisible);
router.delete('/delete', auth, checkPartner, deleteCategory);

export default router;
