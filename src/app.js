import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit: "1mb"}))
app.use(express.urlencoded({extended: true, limit: "1mb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import tenderRoute from './routes/tenderUpload.route.js'  
import noticeRoute from './routes/noticeBoard.route.js'
import CircularRoute from './routes/circularNotification.route.js'
//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tender", tenderRoute)
app.use("/api/v1/notice", noticeRoute)
app.use("api/v1/circular",CircularRoute)



// http://localhost:8000/api/v1/users/register

export { app }