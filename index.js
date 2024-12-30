import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbconfig.js";
import { userAuth } from "./controller/userAuth.js";
import { loggedUser } from "./controller/todo.js";
import { validation } from "./middleware/validation.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const router = Router();
app.use("/", router);
router.use("/auth", userAuth);
router.use("/", validation, loggedUser);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
app.listen(PORT, () => {
  dbConnect(MONGO_URI);
  console.log(`Server is running on port ${PORT}`);
});
