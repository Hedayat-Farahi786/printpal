"use client"; // Mark this component as a client-side component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting the user
import jwt from "jsonwebtoken";
import { db } from "@/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusDropdown from "./StatusDropdown";
import { decodeJWT } from "@/lib/decodeJWT";
import { Order } from "@prisma/client";
import { DataTable } from "./DataTable";
import { Chart } from "./Chart";
import { Loader2 } from "lucide-react";

const secret = process.env.JWT_SECRET!;

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [lastWeekSum, setLastWeekSum] = useState(0);
  const [lastMonthSum, setLastMonthSum] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token is found, redirect to login
      router.push("/login");
      return;
    }

    try {
      // Verify and decode the token
      const decoded = decodeJWT(token);

      // Check if the user is the admin
      // if (decoded.email !== process.env.ADMIN_EMAIL) {
      //   router.push("/404");
      //   return;
      // }

      // If authorized, fetch orders and totals
      setIsAuthorized(true);
      fetchOrders();
    } catch (err) {
      console.error("Token verification failed:", err);
      router.push("/login");
    }
  }, [router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();

      setOrders(data.orders);
      setLastWeekSum(data.lastWeekSum);
      setLastMonthSum(data.lastMonthSum);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  if (!isAuthorized) {
    return <div className="w-full mt-24 flex justify-center">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      <h3 className="font-semibold text-xl">Loading...</h3>
      <p>This won't take long.</p>
    </div>
  </div>;
  }

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekSum ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={((lastWeekSum ?? 0) * 100) / WEEKLY_GOAL} />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthSum ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={((lastMonthSum ?? 0) * 100) / MONTHLY_GOAL} />
              </CardFooter>
            </Card>
          </div>

          <Chart />
          {orders && <DataTable orders={orders} />}

          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Paid</TableHead>
              </TableRow>
            </TableHeader>

            {orders && (
              <TableBody>
                {orders.map((order: Order) => (
                  <TableRow key={order?.id} className="bg-accent">
                    <TableCell>
                      <div className="font-medium">
                        {order?.shippingAddress?.name}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {order?.user?.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <StatusDropdown
                        id={order?.id}
                        orderStatus={order?.status}
                      />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order?.createdAt?.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(order?.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {order.isPaid ? 'yes' : 'no'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
