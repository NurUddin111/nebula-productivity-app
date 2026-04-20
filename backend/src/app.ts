/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from "express";
import { router } from "./app/routes";
import path from "path";
import cookieParser from "cookie-parser";
import { envVars } from "./app/config/env";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: envVars.CLIENT_URL,
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Nebula!",
  });
});

app.use("/api/v1", router);

export default app;
