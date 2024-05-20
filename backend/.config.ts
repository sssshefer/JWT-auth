import {UserDomainServiceImpl} from "./infrastructure/db/dbServices/UserDomainServiceImpl";
import UserService from "./application/service/UserService";
import {UserController} from "./infrastructure/controllers/UserController";
import TokenService from "./application/service/TokenService";
import {TokenDomainServiceImpl} from "./infrastructure/db/dbServices/TokenDomainServiceImpl";
import {MailDomainServiceImpl} from "./infrastructure/mail/services/MailDomainServiceImpl";
import MailService from "./application/service/MailService";

export const userService = new UserService( new UserDomainServiceImpl());
export const mailService =  new MailService(new MailDomainServiceImpl());
export const tokenService = new TokenService( new TokenDomainServiceImpl());

export const userController = new UserController(userService, tokenService, mailService);
