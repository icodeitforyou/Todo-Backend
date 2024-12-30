import mongoose from "mongoose";
export const dbConnect = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};
