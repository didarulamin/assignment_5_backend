import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import BooksModel from "./model/books";
import mongoose from "mongoose";
import config from "./config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3003;

// Connect to your MongoDB database
const connectdb = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log("Connected To DB");
  } catch (error) {
    console.error("Unable to connect to the Database.");
  }
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Fetch all books route
app.get("/allbooks", async (req: Request, res: Response) => {
  try {
    const books = await BooksModel.find();
    console.log(books);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books." });
  }
});

export { app, connectdb };
