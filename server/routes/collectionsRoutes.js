import express from "express";
import {
  getAllCollections,
  addCollection,
  deleteCollection,
  updateCollection,
  getCollectionsByUser,
} from "../controllers/collectionsController.js";

const collectionRoute = express.Router();

collectionRoute.get("/", getAllCollections);
collectionRoute.get("/:userId", getCollectionsByUser);
collectionRoute.post("/addCollection", addCollection);
collectionRoute.put("/update/:id", updateCollection);
collectionRoute.delete("/delete/:id", deleteCollection);

export default collectionRoute;
