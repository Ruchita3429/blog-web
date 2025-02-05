import mongoose from "mongoose";
// import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true, 
  },
  country: {
    type: String,
    required: false, 
  },
  role: {
    type: String,
    enum: ["User", "Admin"], 
    default: "User",
  },
});

export const User = mongoose.models.users || mongoose.model("users", userSchema);
