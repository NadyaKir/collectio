import Collection from "../models/collectionSchema.js";
import Item from "../models/itemSchema.js";
import dotenv from "dotenv";
import uploadImageToImgbb from "../utils/fileUpload.js";

dotenv.config();

export const getAllCollections = async (_, res) => {
  try {
    const collections = await Collection.find();
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCollectionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const collections = await Collection.find({ createdBy: userId });

    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTopCollections = async (req, res) => {
  try {
    const topCollections = await Collection.aggregate([
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "collectionId",
          as: "itemsData",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          numberOfItems: { $size: "$itemsData" },
        },
      },
      { $sort: { numberOfItems: -1 } },
      { $limit: 5 },
    ]);

    res.json(topCollections);
  } catch (error) {
    console.error("Error while getting top collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addCollection = async (req, res) => {
  const newCollectionData = req.body;

  try {
    const imageUrl = await uploadImageToImgbb(newCollectionData.image);
    const collection = new Collection({
      title: newCollectionData.title,
      description: newCollectionData.description,
      category: newCollectionData.category,
      image: imageUrl,
      createdBy: newCollectionData.createdBy,
    });

    const newCollection = await collection.save();
    res.status(201).json(newCollection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCollection = async (req, res) => {
  const base64Regex =
    /^data:image\/(?:png|jpeg|jpg|gif);base64,[A-Za-z0-9+/=]+$/;

  try {
    const { id } = req.params;
    const updatedCollectionData = req.body;

    const imageUrl = base64Regex.test(updatedCollectionData.image)
      ? await uploadImageToImgbb(updatedCollectionData.image)
      : updatedCollectionData.image;

    const updateCollection = {
      title: updatedCollectionData.title,
      description: updatedCollectionData.description,
      category: updatedCollectionData.category,
      image: imageUrl,
      createdBy: updatedCollectionData.createdBy,
    };

    const result = await Collection.findByIdAndUpdate(id, updateCollection, {
      new: true,
    });

    res.json(result);
  } catch (error) {
    console.error("Error updating collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCollection = async (req, res) => {
  const { id } = req.params;

  try {
    await Item.deleteMany({ collectionId: id });

    const deletedCollection = await Collection.findByIdAndDelete(id);

    if (!deletedCollection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    return res.status(200).json({
      message:
        "All items of the collection and the collection itself deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting items and collection:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
