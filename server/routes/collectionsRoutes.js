import express from "express";
import {
  getAllCollections,
  addCollection,
  deleteCollections,
  updateCollection,
  getCollectionsByUser,
  getTopCollections,
  getCollection,
} from "../controllers/collectionsController.js";

const collectionRoute = express.Router();

collectionRoute.get("/", getAllCollections);
collectionRoute.get("/collection/:collectionId", getCollection);
collectionRoute.get("/top", getTopCollections);
collectionRoute.get("/:userId", getCollectionsByUser);
collectionRoute.post("/addCollection", addCollection);
collectionRoute.put("/update/:id", updateCollection);
collectionRoute.delete("/delete", deleteCollections);

export default collectionRoute;
