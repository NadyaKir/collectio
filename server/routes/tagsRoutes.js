import express from "express";
import { getAllTags } from "../controllers/tagsControlles.js";

const tagRoute = express.Router();

tagRoute.get("/", getAllTags);

export default tagRoute;
