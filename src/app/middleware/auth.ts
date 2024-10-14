import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export function authenticateToken(
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user; // Attach user info to request
    next();
  });
}
