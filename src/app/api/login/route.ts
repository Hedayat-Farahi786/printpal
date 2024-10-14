import { NextResponse } from "next/server";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    // Find the user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a JWT token (replace 'your-secret-key' with an environment variable)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );

    // Set the token in an HTTP-only cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true, // Prevent JavaScript from accessing this cookie
      secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
      path: '/',
      maxAge: 60 * 60, // 1 hour expiry
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
