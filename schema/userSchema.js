import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: [true,"email already exist."], required: true },
  password: { type: String, required: true }
});

export const userModel = model("User", userSchema);