import express from "express";
import { getAllTags, getTagNamesByIds } from "../controllers/tagsController.js";

const tagRoute = express.Router();

tagRoute.get("/", getAllTags);
tagRoute.post("/names", getTagNamesByIds);

export default tagRoute;
