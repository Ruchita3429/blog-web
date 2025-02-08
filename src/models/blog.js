import mongoose from "mongoose";

const blogModel = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String, required: true }, 
  authorCountry: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
})
export const Blog = mongoose.models.blogs || mongoose.model("blogs", blogModel);