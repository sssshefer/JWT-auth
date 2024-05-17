import {UserDomainServiceImpl} from "./infrastructure/db/dbServices/UserDomainServiceImpl";
import UserService from "./application/service/UserService/UserService";
import {UserController} from "./infrastructure/controllers/UserController";
import TokenService from "./application/service/TokenService/TokenService";
import {TokenDomainServiceImpl} from "./infrastructure/db/dbServices/TokenDomainServiceImpl";
import {MyEmailService} from "./infrastructure/oldService/MyEmailService";
import {EmailController} from "./infrastructure/controllers/EmailController";

export const userService = new UserService( new UserDomainServiceImpl());
export const emailService =  new MyEmailService();
export const tokenService = new TokenService( new TokenDomainServiceImpl());


export const userController = new UserController(userService, tokenService, emailService);
export const emailController = new EmailController(emailService);
