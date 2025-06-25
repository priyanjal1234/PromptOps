import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      min: 1,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tempAccessKeyId: {
      type: String,
    },
    tempSecretAccessKey: {
      type: String,
    },
    tempSessionToken: {
      type: String
    },
    prompts: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
