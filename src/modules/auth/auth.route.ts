import express from 'express'
import { loginUser, updateSelf } from './auth.controller'
import { authenticateUser } from './auth.middleware'

const authRouter = express.Router()

authRouter.post('/login', loginUser)
authRouter.put('/update', authenticateUser, updateSelf)

export default authRouter