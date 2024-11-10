import { NextFunction, Request, Response } from "express";

import { SelectUnsafeUserModel, UpdateIsVerifyModel } from "../models";
import { BadRequestError } from "../../../errors";
import { compereHash } from "../../../utils/hashes";

export const emailVerificationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, token } = req.params;
    const unsafeUser = await SelectUnsafeUserModel(Number(id));
    if (!unsafeUser) return next(BadRequestError([{ message: "User not exists", field: "id" }]));
    const isTokensMatch = compereHash(unsafeUser.verificationToken, token);
    if (!isTokensMatch) return next(BadRequestError([{ message: "Invalid verification token" }]));

    await UpdateIsVerifyModel(Number(id));

    res.status(301).send("Account is successfully verified");
  } catch (err) {
    next(err);
  }
};
