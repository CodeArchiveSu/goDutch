import BillModel from "../models/BillModel.js";
import GroupModel from "../models/groupModel.js";
import UserModel from "../models/userModel.js";

export const addNewBill = async (req, res) => {
  console.log(req.body);

  try {
    if (
      !req.body.name ||
      !req.body.payer ||
      !Array.isArray(req.body.bill) ||
      req.body.bill.length === 0
    ) {
      res.status(401).json({
        error: "Credentails missing!",
      });
      return;
    }
    console.log(req.body);

    const users = req.body.bill.map((item) => item.user);
    console.log(users);

    const newBill = new BillModel(req.body);
    await newBill.save();
    const populatedGroup = await BillModel.findById(newBill._id)
      .populate({
        path: "bill.user", //
        select: "-password", // '
      })
      .populate({
        path: "bill.user", //
        select: "-password", // '
      });

    await GroupModel.findByIdAndUpdate(
      req.body.group_id,
      { $push: { bills: newBill._id } },
      { new: true }
    );

    await res.status(200).json(populatedGroup);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.log(error);
  }
};

export const getBills = async (req, res) => {
  console.log(req.params.group_id);
  const findBill = await BillModel.find({
    group_id: req.params.group_id,
  })
    .populate({
      path: "payer",
      select: "-password",
    })
    .populate({
      path: "bill.user",
      select: "-password",
    });

  res.status(200).json(findBill);
  try {
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.log(error);
  }
};

//user 업데이트도 해야하고 , 그룹에도 아이디 추가해야해 .
