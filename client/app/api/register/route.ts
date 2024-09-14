import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import CmsUser from "@/models/CmsUser";
import connectDB from "@/api-utils/db";

// POST /api/register
export async function POST(req: NextRequest) {
  await connectDB();

  const { email, password } = await req.json();

  try {
    const existingUser = await CmsUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new CmsUser({ email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
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
