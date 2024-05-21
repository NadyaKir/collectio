import mongoose from "mongoose";
import Item from "../models/itemSchema.js";
import Tag from "../models/tagSchema.js";

export const addItem = async (req, res) => {
  try {
    const { title, tags, collectionId, userId } = req.body;

    if (!title || !tags || !collectionId || !userId) {
      return res.status(400).json({ message: "Not all fields" });
    }

    const newItem = new Item({
      title,
      createdBy: userId,
      collectionId: collectionId,
    });

    await newItem.save();

    for (const tagName of tags) {
      let tag = await Tag.findOne({ name: tagName });

      if (!tag) {
        tag = new Tag({ name: tagName });
        await tag.save();
      }

      newItem.tags.push(tag._id);
    }

    await newItem.save();

    res.status(201).json({ message: "Item added succsessfully", newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error add item" });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, tags } = req.body;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (title) {
      item.title = title;
    }

    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        const existingTag = item.tags.find(
          (itemTag) => itemTag.name === tag.name
        );

        if (!existingTag) {
          let newTag = await Tag.findOne({ name: tag.name });

          if (!newTag) {
            newTag = new Tag({ name: tag.name });
            await newTag.save();
          }

          item.tags.push(newTag);
        }
      }
    }

    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllLastItems = async (req, res) => {
  try {
    const items = await Item.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("collectionId")
      .populate("createdBy");

    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching items" });
  }
};

export const getAllCollectionItems = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const items = await Item.find({ collectionId });

    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching items" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const item = await Item.findById(itemId).populate("tags");

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching item" });
  }
};

export const deleteItems = async (req, res) => {
  try {
    const { itemIds } = req.body;

    if (!itemIds) {
      return res.status(400).json({ message: "No item IDs provided" });
    }

    const deletedItems = await Item.deleteMany({ _id: { $in: itemIds } });

    res
      .status(200)
      .json({ message: "Items deleted successfully", deletedItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting items" });
  }
};
