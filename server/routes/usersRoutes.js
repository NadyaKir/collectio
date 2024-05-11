import express from "express";
import { getUsers, setRole } from "../controllers/userContoller.js";

const userRoute = express.Router();

userRoute.get("/getUsers", getUsers);
userRoute.put("/setRole", setRole);

export default userRoute;
