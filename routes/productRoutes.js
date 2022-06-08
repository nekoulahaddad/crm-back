import express from "express";
import {
  changeSeo,
  clearSeo,
  insertProduct,
  getProductById,
  setIsRecommended
} from "../controllers/productController.js";
import { auth, checkPartner,getUserInfo } from "../middlewares/auth";
const router = express.Router();

router.get("/insertProduct", insertProduct);
router.patch("/seo/change/:id", changeSeo);
router.patch("/seo/clear/:id", clearSeo);
router.get("/get/:id", getUserInfo, getProductById);
router.patch("/setIsRecommended", auth, checkPartner, setIsRecommended);

export default router;
