"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { Order } from "@prisma/client";
import { notFound } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET!;

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  // 1. Retrieve configuration from the database
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) {
    throw new Error("No such configuration found");
  }

  // 2. Retrieve JWT token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  // 3. If no token is found, return notFound or redirect to login
  if (!token) {
    console.log("no token");
    
    return notFound();
  }
  console.log("yes token");


  // 4. Verify and decode the JWT token
  let user: any;
  try {
    user = jwt.verify(token, secret);
  } catch (err) {
    console.error("Token verification failed", err);
    return notFound(); // Redirect if token is invalid
  }

  // 5. Calculate the price based on configuration
  const { finish, material } = configuration;
  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  // 6. Find or create an order for the current user and configuration
  let order: Order | undefined = undefined;
  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.userId,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    // Create a new order if not found
    order = await db.order.create({
      data: {
        amount: price / 100, // Convert amount to proper value
        userId: user.userId,
        configurationId: configuration.id,
      },
    });
  }

   // Make sure the server URL is valid and correctly loaded
   const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
   if (!serverUrl || !serverUrl.startsWith("http")) {
     throw new Error("Server URL is not properly set or invalid.");
   }
 
   // Log order.id and configuration.id to ensure they are valid
   console.log("Order ID:", order.id);
   console.log("Configuration ID:", configuration.id);

  // 7. Create a product in Stripe for the checkout
  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "EUR",
      unit_amount: price,
    },
  });

  // 8. Create a Stripe checkout session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `https://pixiwrap.vercel.app/thank-you?orderId=${order.id}`,
    cancel_url: `https://pixiwrap.vercel.app/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card", "paypal", "klarna", "sofort"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["DE", "US"] },
    metadata: {
      userId: user.userId,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  // 9. Return the Stripe checkout session URL
  return { url: stripeSession.url };
};
