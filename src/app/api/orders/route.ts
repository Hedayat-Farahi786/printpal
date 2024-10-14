// /app/api/orders/route.ts

import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET() {
  try {
    const orders = await db.order.findMany({
      where: {
        // isPaid: true,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        shippingAddress: true,
      },
    });

    const lastWeekSum = await db.order.aggregate({
      where: {
        // isPaid: true,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      _sum: {
        amount: true,
      },
    });

    const lastMonthSum = await db.order.aggregate({
      where: {
        // isPaid: true,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json({
      orders,
      lastWeekSum: lastWeekSum._sum.amount ?? 0,
      lastMonthSum: lastMonthSum._sum.amount ?? 0,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 });
  }
}
