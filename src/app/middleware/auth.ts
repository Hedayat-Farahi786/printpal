import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

type UserPayload = {
  userId: string;
  email: string;
};

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

    // Narrow down the type of user to check for the correct structure
    if (typeof user === "object" && (user as JwtPayload).userId && (user as JwtPayload).email) {
      req.user = user as UserPayload; // Attach user info to request
      next();
    } else {
      return res.status(403).json({ message: "Invalid token structure" });
    }
  });
}
