import connectToDatabase from "@/lib/dbconnect";
  import { Blog } from "@/models/blog";
  import { NextResponse } from "next/server";
  import { User } from "@/models/userModel";
  import { getDataFromToken } from "@/helpers/getDataFromToken"; 

  export async function GET() {
    try {
      await connectToDatabase();
      const blogs = await Blog.find({});
      return NextResponse.json({ success: true, blogs });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
  
  export async function POST(request) {
    try {
      await connectToDatabase();
      const { title, content } = await request.json();
  
      // Get User ID from Token
      const userId = await getDataFromToken(request);
  
      // Fetch User Details
      const user = await User.findOne({ _id: userId }).select("-password");
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      // Create New Blog
      const newBlog = new Blog({
        title,
        content,
        author: user._id,
        authorName: user.username,   
      });
  
      await newBlog.save();
  
      return NextResponse.json({    
          success: true,
          message: "Blog created successfully"});
    } catch (error) {
      return NextResponse.json({      success: false,
          error: error.message }, { status: 500 });
    }
  }
  
