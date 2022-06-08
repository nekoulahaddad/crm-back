import express from "express";
import {
  changeSeo,
  clearSeo,
  insertProduct,
  setIsRecommended,
} from "../controllers/productController.js";
import { auth, checkPartner } from "../middlewares/auth";
const router = express.Router();

router.get("/insertProduct", insertProduct);
router.patch("/seo/change/:id", changeSeo);
router.patch("/seo/clear/:id", clearSeo);
router.patch("/setIsRecommended", auth, checkPartner, setIsRecommended);

export default router;
