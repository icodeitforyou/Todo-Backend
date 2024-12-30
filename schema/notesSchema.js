import { model, Schema } from "mongoose";

const notesSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const notesModel = model("notes", notesSchema);
