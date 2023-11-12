import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "comment is required"],
      minlength: [1, "comment must be at least 1 character"],
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
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

export default mongoose.model("Comment", CommentSchema);
