"use server";

import { db } from "@/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const secret = process.env.JWT_SECRET!;

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  // Retrieve JWT token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  console.log(token)

  // If no token is found, return a 404 or redirect
  if (!token) {
    return notFound();
  }

  // Verify and decode the JWT token
  let user: any;
  try {
    user = jwt.verify(token, secret);
  } catch (err) {
    console.error("Token verification failed:", err);
    return notFound(); // Return 404 if token verification fails
  }

  // Ensure that the JWT contains a valid user ID (check your JWT payload structure)
  const userId = user.userId; // Use user.id if your JWT payload has `id`

  if (!userId) {
    console.error("Invalid token: User ID is missing");
    return notFound();
  }

  // Fetch the order associated with the provided orderId and userId
  const order = await db.order.findFirst({
    where: { id: orderId, userId: userId },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });

  // If no order is found, throw a not found error
  if (!order) {
    throw new Error("This order does not exist.");
  }

  // Check if the order is paid
  if (order.isPaid) {
    return order; // Return the full order details if paid
  } else {
    return { isPaid: false }; // Return false if not paid
  }
};
