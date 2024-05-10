import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
});

module.exports = mongoose.model("Comment", commentSchema);
