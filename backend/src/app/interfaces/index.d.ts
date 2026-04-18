import { JwtPayload } from "jsonwebtoken";
import "socket.io";
import { IUser } from "./user.interface";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

declare module "socket.io" {
  interface Socket {
    user: IUser;
    userId: string;
  }
}
