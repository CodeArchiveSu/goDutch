import UserModel from "../models/userModel.js";
import userModel from "../models/userModel.js";
import { deleteImageFromCloud, imageUpload } from "../utils/imageManagement.js";
import { encryptPassword, verifyPassword } from "../utils/passwordServices.js";
import { removeTempFile } from "../utils/tempFileManagement.js";
import { generateToken } from "../utils/tokenServices.js";

export const signup = async (req, res) => {
  console.log(req.file);
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).json({ error: "Credentials missing" });
    removeTempFile(req.file);
    return;
  }

  try {
    console.log(req.body);
    const exsistingUser = await UserModel.findOne({ email: req.body.email });
    if (exsistingUser) {
      removeTempFile(req.file);
      res.status(500).json({
        error: "email already registered",
      });
      return;
    }

    if (!exsistingUser) {
      const encryptedPassword = await encryptPassword(req.body.password);

      if (!encryptedPassword) {
        removeTempFile(req.file);
        console.log("error encryptingPassword");
        res.status(401).send({
          error: "error encryptingPassword",
        });

        return;
      }

      if (encryptedPassword) {
        const newUser = new userModel(req.body);
        newUser.password = encryptedPassword;

        if (req.file) {
          const avatarUrl = await imageUpload(req.file, "goDutch/avatar");
          newUser.avatar = avatarUrl;
        }

        await newUser.save();

        const userforFront = {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
        };

        res.status(200).json(userforFront);
      }
    }
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res
        .status(500)
        .json({ error: `${error.keyValue.email} alreay registered` });
    }
    res.status(500).json({ error: "Server Erorr" });
  } finally {
    removeTempFile(req.file);
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log(req.body);
    const userToUpdate = await userModel.findByIdAndUpdate(
      req.body._id,
      {
        ...req.body,
      },
      { new: true }
    );

    if (req.file) {
      await deleteImageFromCloud(req.body.prevImg);
      const avatarUrl = await imageUpload(req.file, "goDutch/avatar");
      userToUpdate.avatar = avatarUrl;
    }

    await userToUpdate.save();

    const userforFront = {
      _id: userToUpdate._id,
      name: userToUpdate.name,
      email: userToUpdate.email,
      avatar: userToUpdate.avatar,
    };

    res.status(200).json(userforFront);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server Erorr",
    });
  } finally {
    removeTempFile(req.file);
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const exisitingUser = await UserModel.findOne({ email: req.body.email });

    if (!exisitingUser) {
      res.status(401).json({
        error: "User not found",
      });
    }

    if (exisitingUser) {
      const isPasswordCorrect = await verifyPassword(
        req.body.password,
        exisitingUser.password
      );
      console.log("is password correct", isPasswordCorrect);

      const token = generateToken(exisitingUser._id);

      if (!token) {
        console.log("something went wrong generating token");
        res.status(401).json({
          error: "something went wrong generating token",
        });
        return;
      }
      if (token) {
        res.status(200).json({
          message: "successfully logged-in",
          token: token,
          user: {
            _id: exisitingUser._id,
            name: exisitingUser.name,
            email: exisitingUser.email,
            avatar: exisitingUser.avatar,
          },
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      error: "Server Erorr",
    });
  }
};

export const getUserProfile = async (req, res) => {
  const populatedUser = await UserModel.findById(req.user._id).populate(
    "groups"
  ); // groups 배열에 대해 populate 수행

  // const user = {
  //   _id: req.user._id,
  //   name: req.user.name,
  //   email: req.user.email,
  //   avatar: req.user.avatar,
  //   groups: req.user.groups,
  // };

  if (req.user) {
    res.status(200).json({
      message: "user profile",
      user: populatedUser,
    });
  }

  if (!req.user) {
    res.status(401).json({
      error: "failed to get user Profile",
    });
  }
};

export const getUserbyEmail = async (req, res) => {
  const allUsers = await UserModel.find({
    email: req.params.email,
  });

  try {
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "fail to load all groups",
    });
  }
};
