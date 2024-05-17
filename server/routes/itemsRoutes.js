import express from "express";
import {
  addItem,
  deleteItems,
  getAllLastItems,
  getAllCollectionItems,
  getItemById,
} from "../controllers/itemsController.js";

const itemRoute = express.Router();

itemRoute.get("/", getAllLastItems);
itemRoute.get("/collection/:collectionId", getAllCollectionItems);
itemRoute.get("/item/:itemId", getItemById);
itemRoute.post("/addItem", addItem);
itemRoute.delete("/delete", deleteItems);

export default itemRoute;
