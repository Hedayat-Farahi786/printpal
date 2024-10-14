import { NextResponse } from "next/server";
import { db } from "@/db";
import bcrypt from "bcryptjs";

// Define the POST handler
export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Account created successfully!", user: newUser },
      { status: 201 }
    );
    // @ts-ignore
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
