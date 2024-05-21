import UserDomainService from "../../core/domainService/UserDomainService";
import bcrypt from "bcryptjs";
import {v4} from "uuid";
import MyError from "../../infrastructure/exceptions/MyError";
import ApiError from "../../infrastructure/exceptions/ApiError";
import MailDomainService from "../../core/domainService/MailDomainService";

export default class UserService {
    constructor(
        readonly userDomainService: UserDomainService,
        //todo implement mailDomainService
        readonly mailDomainService: MailDomainService,
    ) {
    }
    async checkUserExists(email: string) {
        return this.userDomainService.checkUserExists(email);
    }

    async getOneByEmail(email: string) {
        return this.userDomainService.getOneByEmail(email);
    };

    async signup(email: string, password: string, timezoneOffset: number, checkEmail: boolean) {
        const userExists = await this.userDomainService.checkUserExists(email)

        if (userExists)
            throw(MyError.inputErrors([{msg: `Email ${email} is taken`, path: 'email'}]))

        const hashedPassword = bcrypt.hashSync(password, 7);
        const activationLink = v4() //random id for activation link
        const user = {
            email: email,
            password: hashedPassword,
            roles: ['USER'],
            isActivated: !checkEmail,
            activationLink: activationLink,
            firstName: 'Set your first name here',
            lastName: 'Set your last name here',
            subscriptionStatus: 'free',
            registrationDate: new Date(),
            lastVisitDate: new Date(),
            totalVisits: 1,
            timezoneOffset: timezoneOffset,
            strike: 1,
        }
        if (checkEmail)
            await this.mailDomainService.sendActivationMail(email, `${process.env.API_URL}/activate/${user.activationLink}`);
        return this.userDomainService.create(user);
    };

    async activate(activationLink: string) {
        const user = await this.userDomainService.getOneByActivationLink(activationLink)
        if (!user) {
            throw ApiError.WrongActivationLinkError()
        }
        return this.userDomainService.update(user.email, {isActivated: true})
    };

    async checkPassword(email: string, password: string) {
        const user  = await this.userDomainService.getOneByEmail(email);
        //todo maybe extract password services to separate abstract class
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        return passwordIsValid
    };

    async setNewPassword(email: string, newPassword: string) {
        //todo maybe extract password services to separate abstract class
        const hashPassword = bcrypt.hashSync(newPassword, 7);
        return this.userDomainService.update(email, {password: hashPassword});
    };

    async validateStrike(email: string) {
        const user = await this.userDomainService.getOneByEmail(email);

        let userCurrentDate = new Date();
        userCurrentDate.setTime(userCurrentDate.getTime() + user.timezoneOffset * 60 * 60 * 1000);

        let userLastVisitDate = new Date(user.lastVisitDate);
        userLastVisitDate.setTime(userLastVisitDate.getTime() + user.timezoneOffset * 60 * 60 * 1000);

        const differenceInDays = Math.floor((userCurrentDate.getSeconds() - userLastVisitDate.getSeconds()) / (1000 * 60 * 60 * 24));
        const datesAreDifferent = userCurrentDate.getUTCDate() !== userLastVisitDate.getUTCDate();

        let checkAddStrike;
        if (differenceInDays < 2) {
            checkAddStrike = datesAreDifferent;
        } else {
            await this.resetStrike(user.email)
        }

        if (checkAddStrike) {
            await this.userDomainService.incrementValue(email, 'strike', 1);
        }
    };

    async resetStrike(email: string) {
        return this.userDomainService.update(email, {strike: 1})
    };

    async updateUserLogs(email: string) {
        await this.userDomainService.update(email, {lastVisitDate: new Date()});
        await this.userDomainService.incrementValue(email, 'totalVisits', 1);
    }

    async update(email: string, newData: {}) {
        return this.userDomainService.update(email, newData);
    }
}

