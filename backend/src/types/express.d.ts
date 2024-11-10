import { Request } from "express";
import { SafeUser } from "../features/auth/models";

declare global {
  namespace Express {
    interface Request {
      currentUser?: SafeUser;
    }
  }
}
