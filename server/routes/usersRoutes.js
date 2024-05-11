import express from "express";
import { getUsers } from "../controllers/userContoller.js";

const userRoute = express.Router();

userRoute.get("/getUsers", getUsers);

export default userRoute;
