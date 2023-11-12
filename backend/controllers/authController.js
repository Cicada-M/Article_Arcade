import UserSchema from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register user controller
export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //generate salt

    // const salt = await bcrypt.genSalt(10);
    // // console.log("pass", salt);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserSchema({
      username: username,
      email: email,
      password: password,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//login user cntroller

export const loginController = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json("Wrong Credentials");
    }

    //generate token
    const token = await jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};

//logout controller
export const logoutController = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json("user logged out successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

//REFETCH USER
export const refetchController = async (req, res) => {
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
      if (err) {
        return res.status(404).json(err);
      }
      // console.log(data._id);
      const user = await UserSchema.exists({ _id: data._id });
      console.log(user);
      if (!user) {
        return res
          .clearCookie("token", { sameSite: "none", secure: true })
          .status(404)
          .json("user not found");
      }
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
