import {NextFunction, Request, Response} from "express";
import UserService from "../../application/service/UserService";
import TokenService from "../../application/service/TokenService";
import MailService from "../../application/service/MailService";
import {
    mailService,
    tokenService,
    userService
} from "../../.config";

export interface IRequestWithServices extends Request {
    userService: UserService,
    tokenService: TokenService,
    mailService: MailService,
}

export const exposeServices = (req:Request, res: Response, next: NextFunction) => {
    (req as IRequestWithServices).userService = userService;
    (req as IRequestWithServices).tokenService = tokenService;
    (req as IRequestWithServices).mailService = mailService;
    next()
}