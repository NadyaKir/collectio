import express from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/usersRoutes.js";
import collectionRoute from "./routes/collectionsRoutes.js";
import itemRoute from "./routes/itemsRoutes.js";
import tagRoute from "./routes/tagsRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    server.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT} `);
    });
  })
  .catch((error) => console.error(error));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/collections", collectionRoute);
app.use("/api/items", itemRoute);
app.use("/api/tags", tagRoute);
