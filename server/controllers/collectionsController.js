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

export const getCollectionById = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;

    const collection = await Collection.findById(collectionId);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.json(collection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCollectionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 8;

    const collections = await Collection.find({ createdBy: userId })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalCollections = await Collection.countDocuments({
      createdBy: userId,
    });

    res.json({ collections, totalCollections });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTopCollections = async (_, res) => {
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
        $addFields: {
          numberOfItems: { $size: "$itemsData" },
          collectionId: "$_id",
        },
      },
      {
        $match: {
          numberOfItems: { $gt: 0 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $addFields: {
          userId: { $arrayElemAt: ["$userData._id", 0] },
          username: { $arrayElemAt: ["$userData.username", 0] },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          numberOfItems: 1,
          userId: 1,
          username: 1,
          collectionId: 1,
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

export const deleteCollections = async (req, res) => {
  const { collectionsIds } = req.body;

  try {
    if (!collectionsIds || collectionsIds.length === 0) {
      return res.status(400).json({ message: "No collection IDs provided" });
    }

    for (const collectionId of collectionsIds) {
      await Item.deleteMany({ collectionId });

      const deletedCollections = await Collection.deleteMany({
        _id: { $in: collectionsIds },
      });

      if (!deletedCollections) {
        console.log(`Collection with ID ${collectionId} not found`);
      }
    }

    return res.status(200).json({
      message:
        "All items in the collections and the collections themselves were deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting items and collections:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
