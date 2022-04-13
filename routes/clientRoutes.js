import express from "express";
import {
  insertClients,
  getClients,
  editClient,
  getClient,
  deleteClient,
  addClient,
  searchClients,
} from "../controllers/clientController.js";
const router = express.Router();

router.get("/insert", insertClients);
router.get("/insertOne", addClient);
router.get("/all", getClients);
router.get("/search", searchClients);
router.put("/edit/:id", editClient);
router.get("/get/:id", getClient);
router.get("/delete/:id", deleteClient);

export default router;
