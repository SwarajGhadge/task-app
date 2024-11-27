import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
