import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;
import bcryptjs from "bcryptjs";
const passwordSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: "user" },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

passwordSchema.pre("save", async function (next) {
  const userPassword = this;
  if (userPassword.isModified("password")) {
    userPassword.password = await bcryptjs.hash(userPassword.password, 12);
  }
  next();
});

export const Password = model("Password", passwordSchema);
