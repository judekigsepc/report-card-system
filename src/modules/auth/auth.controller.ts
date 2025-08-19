import {Request, Response} from 'express'
import { validateRequestBody } from '@utils/validation/validateRequest'
import { sendError } from '@utils/sendError'
import bcrypt from 'bcrypt'
import User from '../users/user.model'
import { sendSuccess } from '@utils/sendSuccess'
import jwt from 'jsonwebtoken'
import { createUser } from '@modules/users/user.service'


export const loginUser = async (req: Request, res: Response) => {
    try {
        const safeData = validateRequestBody('creation','user-login',req)

        const user = await User.findOne({email: safeData.email}).lean()

        if(!user) {
            return sendError(400,"User login failed","User with email not found",res)
        }

        const isPasswordValid = await bcrypt.compare(safeData.password, user.password)
        if (!isPasswordValid) {
            throw new Error("Wrong password provided")
        }

        const jwtToken = jwt.sign({userId: user._id},process.env.JWT_SECRET as string,{expiresIn: '12h'})

        res.cookie('token', jwtToken, {
            httpOnly: true,
            sameSite: true,
            secure: false // SHOULD SET THIS TO TRUE IN PROD
        })

        sendSuccess(200,"User login successful",{},res,false)
    }catch (err) {
         sendError(500,'User login failed',err, res)

    }
}

export const updateSelf = async (req: Request, res:Response) => {
    try {
         const safeData = validateRequestBody('update','user',req)

         const userToUpdate = await User.findById(req.user._id)

         if (!userToUpdate) {
            throw new Error("User not found")
         }

         const updatedUser = await User.findByIdAndUpdate(req.user._id,{...safeData},{new: true})

         sendSuccess(200,"User update successful",updatedUser,res,true)

    }catch (err) {
        sendError(500,"User update failed",err,res)
    }
}