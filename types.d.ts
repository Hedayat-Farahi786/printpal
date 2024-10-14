// types.d.ts
import { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest {
    user?: {
      userId: string;
      email: string;
      // Add other properties as needed
    };
  }
}
