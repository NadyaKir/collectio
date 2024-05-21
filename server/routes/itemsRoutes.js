import express from "express";
import {
  addItem,
  deleteItems,
  getAllLastItems,
  getAllCollectionItems,
  getItemById,
  updateItem,
} from "../controllers/itemsController.js";

const itemRoute = express.Router();

itemRoute.get("/", getAllLastItems);
itemRoute.get("/collection/:collectionId", getAllCollectionItems);
itemRoute.get("/item/:itemId", getItemById);
itemRoute.post("/addItem", addItem);
itemRoute.put("/update/:id", updateItem);
itemRoute.delete("/delete", deleteItems);

export default itemRoute;
