import express from "express";
import { insertShop } from "../controllers/shopController.js";
const router = express.Router();

router.get("/insertShop", insertShop);

export default router;
