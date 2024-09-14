import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import CmsUser from "@/models/CmsUser";
import connectDB from "@/api-utils/db";
// POST /api/login
export async function POST(req: NextRequest) {
  await connectDB();

  const { email, password } = await req.json();

  try {
    const user = await CmsUser.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      // Error is an instance of the Error class
      return NextResponse.json(
        { message: "Server error", error: error.message },
        { status: 500 }
      );
    } else {
      // Handle unexpected error format
      return NextResponse.json(
        { message: "Server error", error: String(error) },
        { status: 500 }
      );
    }
  }
}
