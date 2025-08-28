//src/modules/users/user.service.ts

import { validateRequestBody } from "@utils/validation/validateRequest"
import bcrypt from "bcrypt"
import User from "./user.model"
import { Request } from "express"
import { uploadToCloudinary } from "@utils/cloudinary"

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

export const deleteUser = async (userId: string) => {
      const deletedUser = await User.findByIdAndDelete(userId)

      console.log(`User with id ${userId} Deleted on failure`)

      return deletedUser
}