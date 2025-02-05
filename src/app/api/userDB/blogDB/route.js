import connectToDatabase from "../../../../lib/dbconnect";
import {Blog} from "../../../lib/models/blog"
import { NextResponse } from "next/server";

export async function GET() {
    let data = []
    try {
        await connectToDatabase();
         data = await Blog.find(); 
    } catch (error) {
         data = { success: false}
    }
    return NextResponse.json({ result: data , success: true});
  }
  

 export async function POST(request) {
    try {
        await connectToDatabase();
        const blogData = await request.json();

        const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" });
    }
    
        let newBlog = new Blog( blogData );
        const result = await newBlog.save();
    
        return NextResponse.json({result, success:true});
    } catch (error) {
        console.error("Signup error:", error);
    return NextResponse.json({ success: false, message: "Server error" });
    }
 }
