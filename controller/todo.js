import { Router } from "express";
import { userModel } from "../schema/userSchema.js";
import { notesModel } from "../schema/notesSchema.js";
export const loggedUser = Router();

loggedUser.get("/profile", async (req, res) => {
  try {
    const userEmail=req.user.email;    
    const userData = await userModell.findOne({ email:userEmail });
      return res.json({ status: true, message: "User Logged In Successfully",user:userData });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});

loggedUser.get("/todos", async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userData = await userModel.findOne({ email: userEmail });
    let userId = userData._id;
    const notes = await notesModel.find({ userId: userId });
    return res.json({
      status: true,
      message: "Notes Fetched Successfully",
      notes: notes,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});

loggedUser.post("/todos/add", async (req, res) => {
  try {
    const { title, description } = req.body;
    const userEmail = req.user.email;
    const userData = await userModel.findOne({ email: userEmail });
    let userId = userData._id;
    const notes = await notesModel.create({
      userId: userId,
      title: title,
      description: description,
    });
    return res.json({
      status: true,
      message: "Note Created Successfully",
      notes: notes,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});

loggedUser.put("/todos/edit", async (req, res) => {
  try {
    const { title, description,id } = req.body;
    const userEmail = req.user.email;
    const userData = await userModel.findOne({ email: userEmail });
    let userId = userData._id;
    const note = await notesModel.findOne({ _id: id, userId: userId });
    if (!note) {
      return res.status(404).json({
        status: false,
        message: "Note not found or not authorized to update this note",
      });
    }

    note.title = title || note.title;
    note.description = description || note.description;
    await note.save();

    return res.json({
      status: true,
      message: "Note Updated Successfully",
      notes: note,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});

loggedUser.delete("/todos/delete", async (req, res) => {
  try {
    const {id} = req.body;
    const userEmail = req.user.email;
    const userData = await userModel.findOne({ email: userEmail });
    let userId = userData._id;
    const note = await notesModel.findOneAndDelete({ _id: id, userId: userId });
    if (!note) {
      return res.status(404).json({
        status: false,
        message: "Note not found or not authorized to delete this note",
      });
    }
    return res.json({
      status: true,
      message: "Note Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});