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

// app.get("/", (req: Request, res: Response) => {
//   res.status(200).json({
//     message: "Welcome to Nebula!",
//   });
// });

app.use("/api/v1", router);

// make ready for deployment
// if (envVars.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../../frontend")));

//   app.get("/{*any}", (_, res: Response) => {
//     res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
//   });
// }

if (envVars.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");

  app.use(express.static(frontendPath));

  app.get("/{*any}", (_, res: Response) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

export default app;
