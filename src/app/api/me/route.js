import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import { User } from "@/models/userModel";
import connectToDatabase from "@/lib/dbconnect";

export async function GET(request) {
  try {
    await connectToDatabase();
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    
    return NextResponse.json({
      success: true,
      message: "User found",
      data: user
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}