import express from "express";
import {
  editContactsInformation,
  editMainInformation,
  insertShop,
  getPartners,
  getPartnerById,
  deletePartner,
  clearSeo,
  changeSeo,

} from "../controllers/shopController.js";
const router = express.Router();

router.get("/insertShop", insertShop);
router.put("/editMainInformation/:id", editMainInformation);
router.put("/editContactsInformation/:id", editContactsInformation);
router.get("/all", getPartners);
router.get("/get/:id", getPartnerById);
router.get("/delete/:id", deletePartner);
router.patch("/seo/change/:id", changeSeo);
router.patch("/seo/clear/:id", clearSeo);

export default router;
