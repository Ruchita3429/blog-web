import mongoose from "mongoose";

const blogModel = new mongoose.Schema({
  username : String,
  title : String,
  blog : String,
})
export const Blog = mongoose.models.blogs || mongoose.model("blogs", blogModel);