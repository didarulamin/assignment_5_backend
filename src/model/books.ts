import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const bookSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Author: { type: String, required: true },
  Genre: { type: String, required: true },
  PublicationDate: { type: Date, required: true },
  Reviews: [reviewSchema],
});

const BooksModel = mongoose.model("book", bookSchema);

export default BooksModel;
