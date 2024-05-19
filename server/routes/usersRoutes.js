import express from "express";
import {
  getUsers,
  setRole,
  blockUsers,
  unblockUsers,
  deleteUsers,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/getUsers", getUsers);
userRoute.put("/setRole", setRole);
userRoute.put("/block", blockUsers);
userRoute.put("/unblock", unblockUsers);
userRoute.delete("/delete", deleteUsers);

export default userRoute;
