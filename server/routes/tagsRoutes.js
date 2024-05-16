import express from "express";
import { getAllTags, getTagNamesByIds } from "../controllers/tagsControlles.js";

const tagRoute = express.Router();

tagRoute.get("/", getAllTags);
tagRoute.post("/names", getTagNamesByIds);

export default tagRoute;
