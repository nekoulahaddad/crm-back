import express from "express";
import { insertProduct } from "../controllers/productController.js";
const router = express.Router();

router.get("/insertProduct", insertProduct);

export default router;
