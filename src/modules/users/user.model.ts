import mongoose, { Document, Schema, Types } from "mongoose";
import { UserRoles } from "./user.types";

interface IUser extends Document {
    firstName:string
    lastName: string
    otherNames: string
    email: string
    password: string
    forSchool: Types.ObjectId
    role: UserRoles
    //learnerId: string
}

const UserSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
       type: String,
       required: true
    },
    otherNames: {
       type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    forSchool: {
        type: Schema.Types.ObjectId,
        required: true
    },
    role: {
        type: String,
        enum: ["admin","teacher"]
    }
},{timestamps: true})

const User = mongoose.model<IUser>("User", UserSchema)

export default User