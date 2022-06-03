import express from "express";
import { editRequisites, getRequisites } from "../controllers/requisitesController";
const router = express.Router();

router.get('/get/:id', getRequisites)
router.put('/edit/:id', editRequisites)

export default router;


