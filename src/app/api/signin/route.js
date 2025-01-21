import connectToDatabase from "../../../lib/dbconnect";
import { User } from "../../../models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
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
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
console.log("Retrieved User:",user);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    console.log("Entered Password:", password);
console.log("Stored Password:", user.password);

    console.log("Password Match:", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid password" });
    }

    // JWT token creation
    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role, // Don't include sensitive data like password
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

    const response = NextResponse.json({
      success: true,
      message: "Signin successful",
    });

    // Set the token in cookies
    response.cookies.set("token", token, { httpOnly: true });
    return response;

  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
