import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "description is required"],
      minlength: [1, "description is required"],
    },
    descText: {
      type: String,
      required: [true, "description is required"],
      minlength: [1, "description is required"],
    },
    photo: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    likes: {
      type: Array,
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
