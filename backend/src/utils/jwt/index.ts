import { Request } from "express";
import { SafeUser } from "../../features/auth/models/auth";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../errors";
import { config } from "../../config";

export const createTokenAndRefreshTokenAndSetCookies = (payload: SafeUser, req: Request) => {
  const token = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: config.JWT.EXPIRED_IN });
  const refreshToken = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: config.JWT.REFRESH_EXPIRED_IN });

  req.session = {
    token,
    refreshToken,
  };
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

export const deleteTokenCookie = (req: Request) => {
  req.session = null; // destroy session
};
