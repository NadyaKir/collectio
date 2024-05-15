import express from "express";
import {
  addItem,
  getAllItems,
  getItemById,
} from "../controllers/itemsController.js";

const itemRoute = express.Router();

itemRoute.get("/collection/:collectionId", getAllItems);
itemRoute.get("/item/:itemId", getItemById);
itemRoute.post("/addItem", addItem);

export default itemRoute;
