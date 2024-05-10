import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  collection: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Item", itemSchema);
