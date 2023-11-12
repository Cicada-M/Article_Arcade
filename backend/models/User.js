import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide usernames"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    name: {
      type: String,
      minlength: [4, "name should be at least 4 characters"],
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    desg: {
      type: String,
    },
    bio: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", UserSchema);
