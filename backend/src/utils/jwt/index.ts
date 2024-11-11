import { Request } from "express";
import { SafeUser } from "../../features/auth/models/auth";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../errors";
import { config } from "../../config";

export const createTokenAndSetCookie = (payload: SafeUser, req: Request): string => {
  const token = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: config.JWT.EXPIRED_IN });
  setTokenCookie(req, token);
  return token;
};

export const verifyToken = (token: string): SafeUser | undefined => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY!) as SafeUser;
    return decoded;
  } catch (err) {
    // token is expired or not valid
    throw UnauthorizedError();
  }
};

export const setTokenCookie = (req: Request, token: string) => {
  req.session = {
    token,
  };
};

export const deleteTokenCookie = (req: Request) => {
  req.session = null; // destroy session
};
