import express from "express";
import {
  getUserProfile,
  getUserbyEmail,
  login,
  signup,
  updateUser,
} from "../controller/userController.js";

import { JWTAuth } from "../middleware/JWTAuth.js";

import { multerUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/signup", multerUpload.single("avatar"), signup);
router.post("/login", login);
router.get("/profile", JWTAuth, getUserProfile);
router.get("/findUser/:email", JWTAuth, getUserbyEmail);
router.post("/updateUser", JWTAuth, multerUpload.single("avatar"), updateUser);

export default router;
