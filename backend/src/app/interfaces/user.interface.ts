import { Types } from "mongoose";

interface IUser {
  _id?: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  profilePic?: string;
}

export { IUser };
