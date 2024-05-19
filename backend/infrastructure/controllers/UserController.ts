import {validationResult} from 'express-validator';
import MyError from '../exceptions/MyError';
import {MyEmailService} from '../oldService/MyEmailService';
import passwordGenerator from 'generate-password';
import ApiError from '../exceptions/ApiError';
import UserService from "../../application/service/UserService/UserService";
import {NextFunction, Request, Response} from "express";
import TokenService from "../../application/service/TokenService/TokenService";
import UserTokenDto from "../../application/dtos/UserTokenDto";
import {successResponseMapper} from "./Response/ResponseMappers";


export class UserController {
    userService: UserService;
    tokenService: TokenService;
    emailService: MyEmailService;

    constructor(userService: UserService, tokenService: TokenService, emailService: MyEmailService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return next(MyError.inputErrors( errors.array()))

            let {email, password, timezoneOffset, checkEmail} = req.body;
            email = email.toLowerCase().trim()

            const userExists = await this.userService.checkUserExists(email)

            if (userExists) {
                return next(MyError.inputErrors( [{msg:`Email ${email} is taken`, path:'email'}]))
            }
            console.log(999, checkEmail)
            const user = await this.userService.signup(email, password, timezoneOffset, checkEmail)
            const userForTransfer = UserTokenDto.fromUser(user)
            if (checkEmail)
                await this.emailService.sendActivationMail(email, `${process.env.API_URL}/activate/${user.activationLink}`);
            const tokens = await this.tokenService.generateTokens(userForTransfer)
            await this.tokenService.saveRefreshToken(user._id, tokens.refreshToken)
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
            console.log(errors.array()[0])
            if (!errors.isEmpty()) {
                return next(MyError.inputErrors( errors.array()))
            }

            let {email, password} = req.body
            email = email.toLowerCase().trim();
            const userExists = await this.userService.checkUserExists(email)

            if (!userExists) {
                return next(MyError.inputError( 'User with such email was not found',  'email'))
            }
            let user = await this.userService.getOneByEmail(email)

            const passwordIsValid = await this.userService.checkPassword(email, password)

            if(!passwordIsValid){
                return next(MyError.inputError( 'Invalid password',  'password'))

            }
            const userForTransfer = UserTokenDto.fromUser(user)

            if (!user.isActivated) {
                return next(MyError.inputError('You need to confirm your email',  'emailActivation'))
            }
            if (user.roles === 'ADMIN') {
                return next(MyError.inputError('User with such email was not found',  'email'))
            }
            if (user.roles === 'BANNED') {
                return next(MyError.inputError('Your account is blocked',  'email'))
            }
            const tokens = await this.tokenService.generateTokens(userForTransfer)
            await this.tokenService.saveRefreshToken(user._id, tokens.refreshToken)

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
            if (!userExists) return next(MyError.inputError('User with such email was not found',  'email'))
            const user = await this.userService.getOneByEmail(email)
            await this.emailService.sendActivationMail(user.email, `${process.env.API_URL}/activate/${user.activationLink}`);
            return res.json({})
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const isSuccessful = await this.tokenService.removeToken(refreshToken);
            res.clearCookie('refreshToken');
            const response = successResponseMapper()
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.user.email;
            const user = await this.userService.getOneByEmail(email)
            const userForTransfer = UserTokenDto.fromUser(user);
            return res.json(userForTransfer)
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
            if (user.roles === 'BANNED') {
                next(MyError.inputError('Your account is blocked',  'email'))
            }
            const userForTransfer = UserTokenDto.fromUser(user)

            const tokens = await this.tokenService.generateTokens(userForTransfer)
            await this.tokenService.saveRefreshToken(user._id, tokens.refreshToken)
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
                return next(MyError.inputErrors( errors.array()))
            }
            const email = req.body.user.email;
            const oldPassword = req.body.oldPassword;
            if (!oldPassword) {
                return next(MyError.inputError('Password can not be empty',  'oldPassword'))
            }
            const newPassword = req.body.newPassword;
            if (newPassword.length <= 7 || newPassword.length >= 24) {
                return next(MyError.inputError('Password must has between 8 and 24 characters',  'newPassword'))
            }
            if (oldPassword === newPassword) {
                return next(MyError.inputError('Passwords are the same',  'newPassword'))
            }

            const verification = await this.userService.checkPassword(email, oldPassword)
            if (!verification) {
                return next(MyError.inputError('Incorrect password',  'oldPassword'))
            }

            //await this.userService.setNewPassword(email, newPassword)
            const user = await this.userService.getOneByEmail(email)
            await this.tokenService.removeAllUserTokens(user._id)
            await this.emailService.sendPasswordIsChangedMail(email)
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
            await this.emailService.sendNewPasswordMail(email, newPassword)
            await this.userService.setNewPassword(email, newPassword)
            const user = await this.userService.getOneByEmail(email)
            await this.tokenService.removeAllUserTokens(user._id)
            const userForTransfer = UserTokenDto.fromUser(user);
            res.clearCookie('refreshToken');
            return res.json(successResponseMapper())
        } catch (e) {
            next(e)
        }
    }
}