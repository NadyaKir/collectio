import express from "express";
import {
  getAllCollections,
  addCollection,
  deleteCollections,
  updateCollection,
  getCollectionsByUser,
  getTopCollections,
  getCollectionById,
} from "../controllers/collectionsController.js";

const collectionRoute = express.Router();

collectionRoute.get("/", getAllCollections);
collectionRoute.get("/collection/:collectionId", getCollectionById);
collectionRoute.get("/top", getTopCollections);
collectionRoute.get("/:userId", getCollectionsByUser);
collectionRoute.post("/addCollection", addCollection);
collectionRoute.put("/update/:id", updateCollection);
collectionRoute.delete("/delete", deleteCollections);

export default collectionRoute;
