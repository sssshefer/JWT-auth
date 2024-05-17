import ApiError from "../exceptions/apiError";
import {NextFunction, Response, Request} from 'express';
import {IRequestWithServices} from "./exproseServices/exposeServices";

export default async function (req:Request, res:Response, next:NextFunction) {
    const modifiedReq = req as IRequestWithServices;

    if (modifiedReq.method === "OPTIONS") {
        next()
    }

    try {
        let userFromToken = modifiedReq.body.user;
        let user = await modifiedReq.userService.getOneByEmail(userFromToken.email)

        await modifiedReq.userService.validateSubscriptionStatus(user.email)
        await modifiedReq.userService.validateStrike(user.email)
        await modifiedReq.userService.updateUserLogs(user.email)

        user = await modifiedReq.userService.getOneByEmail(userFromToken.email)

        modifiedReq.body.user = user
        next()
    } catch (e) {
        console.log(e)
        return next(ApiError.UnauthorizedError());
    }
};