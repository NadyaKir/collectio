import express from "express";
import {
  getAllCollections,
  addCollection,
  deleteCollection,
  updateCollection,
  categories,
  getCollectionsByUser,
} from "../controllers/collectionsController.js";

const collectionRoute = express.Router();

collectionRoute.get("/", getAllCollections);
collectionRoute.get("/:userId", getCollectionsByUser);
collectionRoute.get("/categories", categories);
collectionRoute.post("/addCollection", addCollection);
collectionRoute.put("/:id", updateCollection);
collectionRoute.delete("/:id", deleteCollection);

export default collectionRoute;
