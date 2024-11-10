import { NextFunction, Request, Response } from "express";
import { deleteTokenCookie, verifyToken } from "../../utils/jwt";

export const currentUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.session?.token;

    if (!token) {
      req.currentUser = undefined;
      deleteTokenCookie(req);
    } else {
      const safeUser = verifyToken(token);
      if (safeUser) req.currentUser = safeUser;
    }
    next();
  } catch (err) {
    next(err);
  }
};
