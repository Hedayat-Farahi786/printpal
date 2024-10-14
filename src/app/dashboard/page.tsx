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
    return <div>Loading...</div>;
  }

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  const oders = [
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm286ftr2000260eivbqqr9pe",
      configurationId: "cm286fbox000060ei6m6ghibz",
      userId: "cm27uddop0000b5gu723k6bpy",
      amount: 22,
      isPaid: false,
      status: "fulfilled",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T22:48:40.285Z",
      updated: "2024-10-13T22:58:45.106Z",
      user: {
        id: "cm27uddop0000b5gu723k6bpy",
        email: "khwaja.001@gmail.com",
        password:
          "$2a$10$u360rNAheMXtT10t1bdkneV/n11q7gnphM8ut794iC/Nsa.jDsAyy",
        createdAt: "2024-10-13T17:10:50.760Z",
        updatedAt: "2024-10-13T17:10:50.760Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm27xflyu0002o2kwevxotjtj",
      configurationId: "cm27xeoie0000o2kwp11dm44n",
      userId: "cm27sbar2000012l17o7cfuyg",
      amount: 22,
      isPaid: false,
      status: "awaiting_shipment",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T18:36:33.652Z",
      updated: "2024-10-13T18:36:33.652Z",
      user: {
        id: "cm27sbar2000012l17o7cfuyg",
        email: "Hedayatfarahi8@gmail.com",
        password:
          "$2a$10$k3CFq1GPkJjJl7vcGoXI8OXSK9BEwn1NOUHtapKAxZIbpqiIq80Xu",
        createdAt: "2024-10-13T16:13:14.413Z",
        updatedAt: "2024-10-13T16:13:14.413Z",
      },
      shippingAddress: null,
    },
    {
      id: "cm27wg6qh000bb5guw3rtx4zd",
      configurationId: "cm27vv7xz0001b5gun8yzfsj8",
      userId: "cm27sbar2000012l17o7cfuyg",
      amount: 22,
      isPaid: false,
      status: "awaiting_shipment",
      shippingAddressId: null,
      billingAddressId: null,
      createdAt: "2024-10-13T18:09:00.953Z",
      updated: "2024-10-13T18:09:00.953Z",
      user: {
        id: "cm27sbar2000012l17o7cfuyg",
        email: "Hedayatfarahi8@gmail.com",
        password:
          "$2a$10$k3CFq1GPkJjJl7vcGoXI8OXSK9BEwn1NOUHtapKAxZIbpqiIq80Xu",
        createdAt: "2024-10-13T16:13:14.413Z",
        updatedAt: "2024-10-13T16:13:14.413Z",
      },
      shippingAddress: null,
    },
  ];

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
          <DataTable orders={orders} />

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
