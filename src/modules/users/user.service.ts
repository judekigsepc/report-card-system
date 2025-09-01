//src/modules/users/user.service.ts

import { validateRequestBody } from "@utils/validation/validateRequest"
import bcrypt from "bcrypt"
import User from "./user.model"
import { Request } from "express"
import { uploadToCloudinary } from "@utils/cloudinary"
import { Types } from "mongoose"

export const createUser = async (req: Request, extraData: Record<any,any>) => {
     const safeData = validateRequestBody('creation','user',req)

      const password = await bcrypt.hash(safeData.password, 10)


      // Checking if user already exists
      const existingUser = await User.findOne({email: req.body.email}).lean()
      if(existingUser) {
        throw new Error("User with the same email already exists")
      }

      const avatarData = await uploadToCloudinary(req,"images")

      const createdUser = await User.create({...safeData, ...extraData, avatarData:avatarData , password})

      return createdUser 
}

export const updateUser = async (req:Request, userId: Types.ObjectId, extraData?: Record<any,any>) => {
      const safeData = validateRequestBody("update","user",req)

      const userToUpdate = await User.findById(userId).lean()
      if(!userToUpdate) {
        throw new Error("User requested for update does not exist")
      }

      
      console.log(userToUpdate)
      const avatarData = await uploadToCloudinary(req,"images", userToUpdate.avatarData.public_id)

      const updatedUser = await User.findByIdAndUpdate(userId,{...safeData,...avatarData, ...extraData}, {new: true})

      return updatedUser
}

export const deleteUser = async (userId: string) => {
      const deletedUser = await User.findByIdAndDelete(userId)

      console.log(`User with id ${userId} Deleted`)

      return deletedUser
}