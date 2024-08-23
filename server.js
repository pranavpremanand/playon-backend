import express from "express";
const app = express();
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";
import adminRoute from './routes/adminRoute.js'
import mongoose from "mongoose";
import path from "path";

import { fileURLToPath } from 'url';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URL);
mongoose.connection
  .on("connected", () => console.log("Database connected successfully"))
  .on("error", (err) => console.log("Database connection failed!", err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

app.use("/api/user", userRoute);
app.use('/api/admin',adminRoute)