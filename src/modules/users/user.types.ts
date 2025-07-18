import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface UserPayload extends JwtPayload {
    userId: Types.ObjectId
}

export type UserRoles = 'admin' | 'teacher'