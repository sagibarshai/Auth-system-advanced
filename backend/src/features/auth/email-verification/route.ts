import { Router } from "express";
import { emailVerificationController } from "./controller";

const router = Router();

router.get("/emailVerification/:id/:token", emailVerificationController);

export { router as emailRouter };
