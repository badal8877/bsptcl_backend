import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import cron from "node-cron"
import { archiveTenders } from "./controllers/tenderUpload.controller.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Schedule the task to run every day at midnight (00:00)
cron.schedule('0 0 * * *', () => {
    console.log('Running archiveExpiredTenders job at midnight...');
    archiveTenders();
});


app.use(express.json({limit: "1mb"}))
app.use(express.urlencoded({extended: true, limit: "1mb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import tenderRoute from './routes/tenderUpload.route.js'  


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tender", tenderRoute)


// http://localhost:8000/api/v1/users/register

export { app }