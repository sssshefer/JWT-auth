import {NextFunction, Request, Response} from "express";
import UserService from "../../../application/service/UserService/UserService";
import TokenService from "../../../application/service/TokenService/TokenService";
import {IMyEmailService} from "../../../application/IMyEmailService";
import {
    emailService,
    tokenService,
    userService
} from "../../../.config";

export interface IRequestWithServices extends Request {
    userService: UserService,
    tokenService: TokenService,
    emailService: IMyEmailService,
}

export const exposeServices = (req:Request, res: Response, next: NextFunction) => {
    (req as IRequestWithServices).userService = userService;
    (req as IRequestWithServices).tokenService = tokenService;
    (req as IRequestWithServices).emailService = emailService;
    next()
}