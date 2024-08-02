import UserModel from "../models/userModel.js";
import userModel from "../models/userModel.js";

export const signup = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).json({ error: "Credentials missing" });
    return;
  }

  try {
    console.log(req.body);
    const exsistingUser = await UserModel.findOne({ email: req.body.email });
    if (exsistingUser) {
      res.status(500).json({
        error: "email already registered",
      });
      return;
    }
    // const newUser = await userModel.create(req.body);
    const newUser = new userModel(req.body);

    const userforFront = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
    };

    res.status(200).json(userforFront);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res
        .status(500)
        .json({ error: `${error.keyValue.email} alreay registered` });
    }
    res.status(500).json({ error: "Server Erorr" });
  }
};

export const updateUser = async (req, res) => {
  console.log(req.body);
  try {
    const userToUpdate = userModel.findByIdAndUpdate(req.body._id, {
      ...req.body,
    });

    await userToUpdate.save();

    const userforFront = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
    };

    res.status(200).json(userforFront);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server Erorr",
    });
  }
};
