import bcrypt from "bcrypt";
import UserSchema from "../models/User.js";
import PostSchema from "../models/Post.js";
import CommentSchema from "../models/Comment.js";

// update user details
export const updateController = async (req, res) => {
  try {
    if (req.userId !== req.params.id)
      return res.status(401).json({ message: "unauthorized" });

    const updatedUser = await UserSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body.formData,
      },
      { new: true, select: "-password" }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteController = async (req, res) => {
  try {
    if (req.userId !== req.params.id) {
      return res.status(401).json({ message: "unauthorized" });
    }
    await UserSchema.findByIdAndDelete(req.params.id);
    await PostSchema.deleteMany({ userId: req.params.id });
    await CommentSchema.deleteMany({ userId: req.params.id });
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json("user deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET USER DETAILS
export const getController = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};
