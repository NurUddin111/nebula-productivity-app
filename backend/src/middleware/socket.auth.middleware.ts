/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";
import { envVars } from "../app/config/env";
import User from "../app/models/User";

export const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: Error) => void,
) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    const decoded = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`,
    );

    next();
  } catch (error: any) {
    console.error("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
