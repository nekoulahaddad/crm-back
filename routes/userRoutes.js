import express from "express";
const router = express.Router();
import {
  insertClient,
  insertAdmin,
  insertPartner,
  getClients,
  editClient,
  getClient,
  deleteClient,
  addClient,
} from "../controllers/userController.js";

router.get("/insertClient", insertClient);
router.get("/insertAdmin", insertAdmin);
router.get("/insertPartner", insertPartner);
router.get("/addClient", addClient);
router.get("/all", getClients);
router.put("/edit/:id", editClient);
router.get("/get/:id", getClient);
router.get("/delete/:id", deleteClient);

export default router;
