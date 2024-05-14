import Collection from "../models/collectionSchema.js";
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

export const categories = async (_, res) => {
  try {
    const categories = Collection.schema.path("category").enumValues;
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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
    console.log("result это", result);
    res.json(result);
  } catch (error) {
    console.error("Error updating collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteCollection = async (req, res) => {
  const { id } = req.params;
  try {
    await Collection.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ message: "Error deleting collection" });
  }
};
