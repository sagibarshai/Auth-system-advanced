import helmet from "helmet";
import express from "express";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import "dotenv/config";

import { config } from "./config";
import { errorMiddleware } from "./middlewares/errors";
import { notfoundMiddleware } from "./middlewares/errors/not-found";
import { authRoutes } from "./features/auth";
import { pgClient } from "./database/init";

const app = express();

app.use(json());

app.use(helmet());

console.log(config.COOKIES.EXPIRED_IN);

app.use(
  cookieSession({
    keys: [process.env.COOKIE_SECRET!],
    secure: config.PROD ? true : false,
    maxAge: config.COOKIES.EXPIRED_IN, // 1 hour
    signed: false, // not encrypt the cookie
    httpOnly: true,
  })
);

app.use("/api", authRoutes);

app.use("/*", notfoundMiddleware);

app.use(errorMiddleware);

const startUp = async () => {
  try {
    await pgClient.connect();
    console.log(`Listen on port ${config.PORT}`);
  } catch (err) {
    console.log("Database connection error ", err);
    process.exit(0);
  }
};

app.listen(config.PORT, startUp);
