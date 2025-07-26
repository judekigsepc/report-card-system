
  
  import express, { Request, Response } from 'express';
  import cors from 'cors';
  import cookieParser from 'cookie-parser';
  import connectToDB from '@configs/db'
  import checkEnvVars from '@utils/checkEnv'

import authRouter from '@modules/auth/auth.route';
import superAdminRouter from '@modules/super-admin/super-admin.route';
import schoolRouter from '@modules/schools/school.route';

const app = express();

app.use(cors({
origin: "*",
credentials: true
}))

app.use(express.json());
app.use(cookieParser())

const envVars = ["PORT","DB_URI","JWT_SECRET","NODE_ENV","SUPER_ADMIN_USERNAME","SUPER_ADMIN_PASSWORD","SUPER_ADMIN_NICKNAME","CLOUDINARY_URL"]
// Checking for presence of all env variables
checkEnvVars(envVars)

const port = process.env.PORT || 3000
const dbURL = process.env.DB_URI as string

//Connecting to database
connectToDB(dbURL)

app.listen(port, () => {
 console.log(`Server running on port ${port}`)
})

app.get('/', (req:Request, res:Response) => {
res.send('Server up and running')
})

app.use('/api/v1//auth', authRouter)
app.use('/api/v1/super_admin', superAdminRouter)
app.use('/api/v1/school',schoolRouter)
