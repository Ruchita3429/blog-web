import connectToDatabase from "../../../lib/dbconnect";
import {User} from "../../../models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function GET() {
    let data = []
    try {
        await connectToDatabase();
         data = await User.find(); 
    } catch (error) {
         data = { success: false}
    }
    return NextResponse.json({ result: data , success: true});
  }
  

 export async function POST(request) {
  try {
    await connectToDatabase();
    const userData = await request.json();
    const {email,username,password,signupAs,country } = userData;
       //hash password 
        const salt = await bcryptjs.genSalt(10);
        const hashedPass =  await bcryptjs.hash(password , salt);
       
       const existingUser = await User.findOne({ email });
       if (existingUser) {
         return NextResponse.json({ success: false, message: "User already exists" });
       }
       console.log(existingUser);
       
       let newUser = new User({
        email,
        username,
        password: hashedPass, 
        role: signupAs,      
        country,
      });
       const result = await newUser.save();

       return NextResponse.json({result, success:true});


  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
