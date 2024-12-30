import { Router } from "express";
import { userModel } from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export const userAuth = Router();
dotenv.config();

userAuth.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required." });
    }
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User Not Found");
    if (user.password == password) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.json({
        status: true,
        message: "User Logged In Successfully",
        user: user,
        token: token,
      });
    } else {
      throw new Error("Password Not Match");
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});

userAuth.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required." });
    }
    const user = await userModel.create({ name, email, password });
    res.status(201).json({
      status: true,
      message: "Account created successfully.",
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ status: false, message: "Email already exists." });
    }
    res.status(500).json({
      status: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
});
