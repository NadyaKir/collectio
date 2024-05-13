import Collection from "../models/collectionSchema.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const uploadImageToImgbb = async (image) => {
  console.log(process.env.CLOUD_API_KEY);
  const data = new FormData();
  data.append("image", image);
  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=e676a0d847387b12712d9187b1f08f85&name=${image.name}`,
      {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const responseData = await response.json();
    console.log("responsefromtoimgbb", responseData);
    // console.log(response.data.data.url);
    return responseData.data.url;
  } catch (error) {
    console.log(error);
  }
  // try {
  //   const formData = new FormData();
  //   // formData.append("key", "e676a0d847387b12712d9187b1f08f85");
  //   formData.append("image", image);

  //   const response = await axios.post(
  //     "https://api.imgbb.com/1/upload?key=e676a0d847387b12712d9187b1f08f85",
  //     formData,
  //     {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );

  //   if (
  //     response.status === 200 &&
  //     response.data &&
  //     response.data.data &&
  //     response.data.data.url
  //   ) {
  //     console.log("Image uploaded successfully:", response.data);
  //     return response.data.data.url;
  //   } else {
  //     console.error("Error uploading image:", response.data);
  //     throw new Error("Failed to upload image to Imgbb");
  //   }
  // } catch (error) {
  //   console.error("Error uploading image:", error);
  //   throw new Error("Failed to upload image to Imgbb");
  // }
};

export const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const categories = async (req, res) => {
  try {
    const categories = Collection.schema.path("category").enumValues;
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addCollection = async (req, res) => {
  const updatedCollection = req.body;
  console.log("back", updatedCollection);
  try {
    const imageUrl = await uploadImageToImgbb(updatedCollection.image);

    const collection = new Collection({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: imageUrl,
      createdBy: req.body.createdBy,
    });

    const newCollection = await collection.save();
    res.status(201).json(newCollection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCollection = req.body;

    // Загрузка изображения в Imgbb
    const imageUrl = await uploadImageToImgbb(updatedCollection.image);

    // Сохранение URL-адреса изображения в базе данных
    updatedCollection.image = imageUrl;

    // Обновление данных коллекции в базе данных
    const result = await Collection.findByIdAndUpdate(id, updatedCollection, {
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
    await Collection.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ message: "Error deleting collection" });
  }
};
