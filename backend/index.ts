import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose, {ConnectOptions} from 'mongoose';
import userRouter from './infrastructure/routers/userRouter';
import emailRouter from './infrastructure/routers/emailRouter';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './infrastructure/middleware/errorMiddleware';
import {exposeServices} from "./infrastructure/middleware/exproseServices/exposeServices";


const PORT = process.env.PORT || 5000

const app = express()


app.use(express.json())
app.use(exposeServices)
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(userRouter)

app.use(emailRouter)
app.use(errorMiddleware)

const start = async () => {
    try {//TODO change password and username in db
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ed2lfon.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as ConnectOptions)

        //Just to show in console that server works
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()