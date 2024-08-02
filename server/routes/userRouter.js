import express from "express";
import { signup, updateUser } from "../controller/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/updateUser", updateUser);

export default router;
