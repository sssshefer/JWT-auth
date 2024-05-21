import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose, {ConnectOptions} from 'mongoose';
import userRouter from './infrastructure/routers/userRouter';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './infrastructure/middleware/errorMiddleware';
import {exposeServices} from "./infrastructure/middleware/exposeServices";


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

app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as ConnectOptions)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()