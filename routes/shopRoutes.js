import express from "express";
import {
  editContactsInformation,
  editMainInformation,
  insertShop,
  getPartners,
} from "../controllers/shopController.js";
const router = express.Router();

router.get("/insertShop", insertShop);
router.put("/editMainInformation/:id", editMainInformation);
router.put("/editContactsInformation/:id", editContactsInformation);
router.get("/all", getPartners);

export default router;
