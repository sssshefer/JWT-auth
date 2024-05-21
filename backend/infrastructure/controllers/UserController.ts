import {validationResult} from 'express-validator';
import MyError from '../exceptions/MyError';
import passwordGenerator from 'generate-password';
import ApiError from '../exceptions/ApiError';
import UserService from "../../application/service/UserService";
import {NextFunction, Request, Response} from "express";
import TokenService from "../../application/service/TokenService";
import UserTokenDto from "./DTOs/UserTokenDto";
import {successResponseMapper} from "./Response/ResponseMappers";
import MailService from "../../application/service/MailService";


export class UserController {
    userService: UserService;
    tokenService: TokenService;
    mailService: MailService;

    constructor(userService: UserService, tokenService: TokenService, mailService: MailService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.mailService = mailService;
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return next(MyError.inputErrors(errors.array()))

            let {email, password, timezoneOffset, checkEmail} = req.body;
            email = email.toLowerCase().trim()

            const user = await this.userService.signup(email, password, timezoneOffset, checkEmail)
            const userForTransfer = UserTokenDto.fromUser(user)
            if (checkEmail)
                await this.mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${user.activationLink}`);
            const tokens = await this.tokenService.generateTokens(userForTransfer)
            await this.tokenService.saveRefreshToken(email, tokens.refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })

            const sessionDataForTransfer = {accessToken: tokens.accessToken, userDetails: userForTransfer}
            const response = successResponseMapper(sessionDataForTransfer)
            return res.json(response)
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(MyError.inputErrors(errors.array()))
            }

            let {email, password} = req.body
            email = email.toLowerCase().trim();
            const userExists = await this.userService.checkUserExists(email)

            if (!userExists) {
                return next(MyError.inputError('User with such email was not found', 'email'))
            }
            let user = await this.userService.getOneByEmail(email)

            const passwordIsValid = await this.userService.checkPassword(email, password)

            if (!passwordIsValid) {
                return next(MyError.inputError('Invalid password', 'password'))

            }
            const userForTransfer = UserTokenDto.fromUser(user)

            if (!user.isActivated) {
                return next(MyError.inputError('You need to confirm your email', 'emailActivation'))
            }
            if (user.roles.includes('ADMIN')) {
                return next(MyError.inputError('User with such email was not found', 'email'))
            }
            if (user.roles.includes('BANNED')) {
                return next(MyError.inputError('Your account is blocked', 'email'))
            }
            const tokens = await this.tokenService.generateTokens(userForTransfer)
            await this.tokenService.saveRefreshToken(email, tokens.refreshToken)

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            const sessionDataForTransfer = {accessToken: tokens.accessToken, userDetails: userForTransfer}
            const response = successResponseMapper(sessionDataForTransfer)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async resendActivationLink(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const userExists = await this.userService.checkUserExists(email)
            if (!userExists) return next(MyError.inputError('User with such email was not found', 'email'))
            const user = await this.userService.getOneByEmail(email)
            await this.mailService.sendActivationMail(user.email, `${process.env.API_URL}/activate/${user.activationLink}`);
            return res.json(successResponseMapper())
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            await this.tokenService.removeToken(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(successResponseMapper());
        } catch (e) {
            next(e);
        }
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.user.email;
            const user = await this.userService.getOneByEmail(email)
            const userForTransfer = UserTokenDto.fromUser(user);
            const response = successResponseMapper(userForTransfer)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async updateTokens(req: Request, res: Response, next: NextFunction) {
        try {
            //Todo make different service for this
            //await userService.addTotalUserVisits()
            const {refreshToken} = req.cookies;
            //TODO put errors handling inside validateRefreshToken
            let tokenIsValid = await this.tokenService.validateRefreshToken(refreshToken)
            if (!tokenIsValid) {
                return next(ApiError.UnauthorizedError());
            }
            const userFromToken = await this.tokenService.getUserFromRefreshToken(refreshToken)
            //todo change to userId in core layer or find a way to get user from token straightaway
            const checkUserExists = await this.userService.checkUserExists(userFromToken.email);
            if (!checkUserExists) {
                return next(ApiError.UnauthorizedError());
            }
            const user = await this.userService.getOneByEmail(userFromToken.email);
            if (!user.isActivated) {
                next(MyError.inputError('User with such email was not found', 'email'))
            }
            if (user.roles.includes('BANNED')) {
                next(MyError.inputError('Your account is blocked', 'email'))
            }
            const userForTransfer = UserTokenDto.fromUser(user)

            const tokens = await this.tokenService.generateTokens(userForTransfer)
            await this.tokenService.saveRefreshToken(user.email, tokens.refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(tokens.accessToken);
        } catch (e) {
            next(e);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await this.userService.activate(activationLink);
            //todo design reply for activation link
            const successfulActivationMessage = `<h2 style="font-family: 'Montserrat', sans-serif, Arial; margin:40px;">Thank you, your email is confirmed now!</h2>`
            res.send(successfulActivationMessage)
        } catch (e) {
            next(e);
        }
    }

    async updateFirstName(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.user.email;
            const newFirstName = req.body.newFirstName
            await this.userService.update(email, {firstName: newFirstName});
            const user = await this.userService.getOneByEmail(email)
            const userForTransfer = UserTokenDto.fromUser(user);
            return res.json(successResponseMapper(userForTransfer))
        } catch (e) {
            next(e)
        }
    }

    async updateLastName(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.user.email;
            const newLastName = req.body.newLastName
            await this.userService.update(email, {lastName: newLastName});
            const user = await this.userService.getOneByEmail(email)
            const userForTransfer = UserTokenDto.fromUser(user);
            return res.json(successResponseMapper(userForTransfer))
        } catch (e) {
            next(e)
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(MyError.inputErrors(errors.array()))
            }
            const email = req.body.user.email;
            const {oldPassword, newPassword} = req.body;
            if (oldPassword === newPassword) {
                return next(MyError.inputError('Passwords are the same', 'newPassword'))
            }
            const verification = await this.userService.checkPassword(email, oldPassword)
            if (!verification) {
                return next(MyError.inputError('Incorrect password', 'oldPassword'))
            }

            await this.userService.setNewPassword(email, newPassword)
            const user = await this.userService.getOneByEmail(email)
            await this.tokenService.removeAllUserTokens(email)
            await this.mailService.sendPasswordIsChangedMail(email)
            res.clearCookie('refreshToken');
            return res.json(successResponseMapper())
        } catch (e) {
            next(e)
        }
    }

    async sendNewPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.email
            const newPassword = passwordGenerator.generate({
                length: 10,
                numbers: true
            });
            await this.mailService.sendNewPasswordMail(email, newPassword)
            await this.userService.setNewPassword(email, newPassword)
            const user = await this.userService.getOneByEmail(email)
            await this.tokenService.removeAllUserTokens(email)
            const userForTransfer = UserTokenDto.fromUser(user);
            res.clearCookie('refreshToken');
            return res.json(successResponseMapper(userForTransfer))
        } catch (e) {
            next(e)
        }
    }
}