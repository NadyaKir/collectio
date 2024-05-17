import express from "express";
import {
  addItem,
  deleteItems,
  getAllItems,
  getItemById,
} from "../controllers/itemsController.js";

const itemRoute = express.Router();

itemRoute.get("/collection/:collectionId", getAllItems);
itemRoute.get("/item/:itemId", getItemById);
itemRoute.post("/addItem", addItem);
itemRoute.delete("/delete", deleteItems);

export default itemRoute;
