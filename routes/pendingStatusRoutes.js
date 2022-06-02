import express from "express";
const router = express.Router();
import { addPendingStatus } from '../controllers/pendingStatusController'

router.post('/add', addPendingStatus)

export default router;
