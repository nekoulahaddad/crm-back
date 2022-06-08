import express from "express";
import {
  changeSeo,
  clearSeo,
  insertProduct,
  getProductById,
} from "../controllers/productController.js";
import { getUserInfo } from "../middlewares/auth.js";
const router = express.Router();

router.get("/insertProduct", insertProduct);
router.patch("/seo/change/:id", changeSeo);
router.patch("/seo/clear/:id", clearSeo);
router.get("/get/:id", getUserInfo, getProductById);

export default router;
