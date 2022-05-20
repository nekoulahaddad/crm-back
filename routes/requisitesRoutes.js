import express from "express";
import { editRequisites } from "../controllers/requisitesController";
const router = express.Router();

router.put('/edit/:id', editRequisites)

export default router;


