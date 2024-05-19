import ApiError from '../exceptions/ApiError';
import MyError from '../exceptions/MyError';
import {Request,Response, NextFunction} from 'express';
import {IRequestWithServices} from "./exproseServices/exposeServices";

export default async function (req:Request, res:Response, next:NextFunction) {
    const modifiedReq = req as IRequestWithServices;
    if (modifiedReq.method === "OPTIONS") {
        next()
    }

    try {
        const accessToken = modifiedReq.headers.authorization ? modifiedReq.headers.authorization.split(' ')[1] : undefined

        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const tokenIsValid =  modifiedReq.tokenService.validateAccessToken(accessToken);
        if (!tokenIsValid) {
            return next(ApiError.UnauthorizedError());
        }

        const userFromToken = await modifiedReq.tokenService.getUserFromAccessToken(accessToken);

        const checkUserExists = await modifiedReq.userService.checkUserExists(userFromToken.email);
        if(!checkUserExists){
            return next(ApiError.UnauthorizedError());
        }
        if(!userFromToken.isActivated){
            return next(ApiError.UnauthorizedError());
        }
        if(userFromToken.roles === 'BANNED'){
            next(MyError.inputError('Your email is banned',  'email'))
        }

        modifiedReq.body.user = userFromToken
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};