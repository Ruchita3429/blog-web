import connectToDatabase from "../../../lib/dbconnect";
import { User } from "../../../models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    await connectToDatabase();
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email }); 
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // Correctly compare passwords
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid password" });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

    const response = NextResponse.json({
      success: true,
      message: "Signin successful",
    });

    response.cookies.set("token", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}