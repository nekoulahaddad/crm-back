import express from "express";
import { changeSeo, clearSeo, insertProduct } from "../controllers/productController.js";
const router = express.Router();

router.get("/insertProduct", insertProduct);
router.patch("/seo/change/:id", changeSeo);
router.patch("/seo/clear/:id", clearSeo);

export default router;
