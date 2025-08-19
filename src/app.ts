// report-card-system/src/app.ts
  
  import express, { Request, Response } from 'express';
  import cors from 'cors';
  import cookieParser from 'cookie-parser';
  import connectToDB from '@configs/db'
  import { connectRedis } from '@configs/redis';

import authRouter from '@modules/auth/auth.route';
import superAdminRouter from '@modules/super-admin/super-admin.route';
import schoolRouter from '@modules/schools/school.route';
import schoolAdminRouter from '@modules/school-admin/school-admin.route';

const app = express();

app.use(cors({
origin: "*",
credentials: true
}))

app.use(express.json());
app.use(cookieParser())


const port = process.env.PORT || 3000
const dbURL = process.env.DB_URI as string

//Connecting to database
connectToDB(dbURL)
//Connecting to Redis
connectRedis()

app.listen(port, () => {
 console.log(`Server running on port ${port}`)
})

app.get('/', (req:Request, res:Response) => {
res.send('Server up and running')
})

app.use('/api/v1//auth', authRouter)
app.use('/api/v1/super_admin', superAdminRouter)
app.use('/api/v1/schools',schoolRouter)
app.use('/api/v1/school_admin', schoolAdminRouter)
