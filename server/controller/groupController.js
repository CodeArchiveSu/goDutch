import { json } from "express";
import GroupModel from "../models/groupModel.js";
import UserModel from "../models/userModel.js";

export const createNewGroup = async (req, res) => {
  console.log(req.body);

  try {
    if (!req.body.name || req.body.members.length === 0) {
      res.status(500).json({ error: "Credentials missing" });
      return;
    } else {
      const newGroup = new GroupModel(req.body);
      await newGroup.save();

      const populatedGroup = await GroupModel.findById(newGroup._id).populate(
        "members"
      );

      await Promise.all(
        req.body.members.map((memberId) =>
          UserModel.findByIdAndUpdate(
            memberId,
            { $push: { groups: newGroup._id } },
            { new: true }
          )
        )
      );
      res.status(200).json(populatedGroup);
    }
  } catch (error) {
    console.log(error);
    json.status(500).json({ error: "Server Error" });
  }
};

export const getGroup = async (req, res) => {
  try {
    console.log(req.params.userID);
    const groups = await GroupModel.find({
      members: req.params.userID,
    })
      .populate("members")
      .populate("bills")
      .populate({
        path: "bills",
        populate: [
          {
            path: "bill.user",
          },
        ],
      });

    res.status(200).json({
      groups: groups,
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    });
  }
};

export const getAllgroups = async (req, res) => {
  const allGroups = await GroupModel.find({});

  try {
    res.status(200).json({
      number: allGroups.length,
      allGroups,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "fail to load all groups",
    });
  }
};

export const getDetailPage = async (req, res) => {
  try {
    const selectedGroup = await GroupModel.find({
      _id: req.params.groupID,
    })
      .populate({
        path: "members",
        select: "-password",
      })
      .populate({
        path: "bills",
        populate: [
          {
            path: "bill.user", // 각 bill의 user를 populate
            select: "-password",
          },
          {
            path: "payer",
            select: "-password",
          },
        ],
      });

    res.status(200).json(selectedGroup);
  } catch (error) {
    res.status(400).json({
      error: "fail to load details of group",
    });
  }
};
