import {UserDomainServiceImpl} from "./infrastructure/db/dbServices/UserDomainServiceImpl";
import UserService from "./application/service/UserService";
import {UserController} from "./infrastructure/controllers/UserController";
import TokenService from "./application/service/TokenService";
import {TokenDomainServiceImpl} from "./infrastructure/db/dbServices/TokenDomainServiceImpl";
import {MailDomainServiceImpl} from "./infrastructure/mail/services/MailDomainServiceImpl";
import MailService from "./application/service/MailService";

const userDomainService = new UserDomainServiceImpl();
const mailDomainService = new MailDomainServiceImpl();
const tokenDomainService = new TokenDomainServiceImpl();


export const userService = new UserService( userDomainService, mailDomainService);
export const mailService =  new MailService(mailDomainService);
export const tokenService = new TokenService( tokenDomainService);

export const userController = new UserController(userService, tokenService, mailService);
