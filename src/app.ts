import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import BooksModel from "./model/books";
import mongoose from "mongoose";
import config from "./config";
import { title } from "process";

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
app.post("/delete/:title", async (req: Request, res: Response) => {
  try {
    const title = req.params.title;
    const deletedBook = await BooksModel.findOneAndRemove({ Title: title });
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.json({ message: "Book deleted successfully.", deletedBook });
  } catch (err) {
    res.status(500).json({ message: "Error deleting the book." });
  }
});

// POST - Add a new book
app.post("/addbook", async (req: Request, res: Response) => {
  // const { Title, Author, Genre, PublishedYear, Reviews } = req.body; // Assuming you have these fields, adjust as per your book model

  try {
    const newBook = new BooksModel({
      /*    Title,
      Author,
      Genre,
      PublishedYear,
      Reviews, */
      // Add other book properties here
      ...req.body,
    });
    console.log(newBook);
    const savedBook = await newBook.save();
    res.json({ message: "Book added successfully.", book: savedBook });
  } catch (err) {
    res.status(500).json({ message: "Error adding the book." });
  }
});

export { app, connectdb };
