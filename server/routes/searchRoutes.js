import express from "express";
import { search } from "../controllers/searchController.js";

const searchRoute = express.Router();

searchRoute.get("/", search);

export default searchRoute;
