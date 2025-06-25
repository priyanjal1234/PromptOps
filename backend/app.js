import express from 'express'
import cors from 'cors'

const app = express()

// Route Imports
import awsRouter from './routes/aws.router.js'
import userRouter from './routes/user.router.js'
import cookieParser from 'cookie-parser'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/users",userRouter)

app.use("/api/aws",awsRouter)

export default app