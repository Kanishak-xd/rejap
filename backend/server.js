import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
console.log("Connected to MongoDB");

export const db = client.db("rejap");
app.use("/api/users", userRoutes);

app.listen(3001, () => console.log("Backend running on port 3001"));
