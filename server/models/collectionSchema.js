import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  theme: {
    type: String,
    enum: ["Books", "Signs", "Silverware", "Other"],
    required: true,
  },
  image: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = mongoose.model("Collection", collectionSchema);
