import express from "express";
import { addNewBill, getBills } from "../controller/billController.js";

const router = express.Router();

router.post("/addNewBills", addNewBill);
router.get("/laodBills/:group_id", getBills);

export default router;
