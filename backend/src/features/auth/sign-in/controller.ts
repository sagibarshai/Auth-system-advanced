import { NextFunction, Request, Response } from "express";
import { SelectUnsafeUserModel, UpdateLoginModel } from "../models/auth";
import { BadRequestError, ForbiddenError } from "../../../errors";
import { compereHash } from "../../../utils/hashes";
import { createTokenAndSetCookie, deleteTokenCookie } from "../../../utils/jwt";

interface SignUpRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const signInController = async (req: SignUpRequest, res: Response, next: NextFunction) => {
  try {
    const storedUser = await SelectUnsafeUserModel(req.body.email);
    if (!storedUser) return next(BadRequestError([{ message: "Wrong Credentials" }]));
    if (!storedUser.isVerified) return next(ForbiddenError([{ message: "Email not verify, please check user email" }]));

    const isPasswordsMatch = compereHash(storedUser.password, req.body.password);
    if (!isPasswordsMatch) {
      deleteTokenCookie(req);
      return next(BadRequestError([{ message: "Wrong Credentials" }]));
    }
    const safeUser = await UpdateLoginModel(req.body.email);
    createTokenAndSetCookie(safeUser, req);

    res.status(200).send(safeUser);
  } catch (err) {
    next(err);
  }
};
