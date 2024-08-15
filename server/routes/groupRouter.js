import express from "express";
import {
  createNewGroup,
  getAllgroups,
  getDetailPage,
  getGroup,
} from "../controller/groupController.js";
import { JWTAuth } from "../middleware/JWTAuth.js";

const router = express.Router();

router.post("/newGroup", JWTAuth, createNewGroup);
router.get("/allGroups", JWTAuth, getAllgroups);
router.get("/:userID", JWTAuth, getGroup);
router.get("/detail/:groupID", getDetailPage);

export default router;
