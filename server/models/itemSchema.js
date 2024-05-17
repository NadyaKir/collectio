import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  title: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number, default: 0 },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
