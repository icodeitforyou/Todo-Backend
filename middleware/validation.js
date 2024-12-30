import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const validation = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      res.status(401).json({ message: "Token Not Found" });
      return;
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token,user)
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("ndkakdkba",error);
  }
};
