import UserDomainService from "../../../core/domainService/UserDomainService";
import bcrypt from "bcryptjs";
import {v4} from "uuid";
import ApiError from "../../exceptions/ApiError";
import {MongoOrm as orm} from "../orm/MongoOrm";

export class UserDomainServiceImpl implements UserDomainService {

    async checkUserExists(email: string) {
        try {
            return !!await orm.user.getOne({email});
        } catch (e) {
            return false;
        }
    }
    async getOneByEmail(email: string) {
        return orm.user.getOne({email});
    }

    async signup(email: string, password: string, timezoneOffset: number, checkEmail: boolean) {
        const hashedPassword = bcrypt.hashSync(password, 7);
        const activationLink = v4() //random id for activation link
        const user = {
            email: email,
            password: hashedPassword,
            activationLink: activationLink,
            timezoneOffset: timezoneOffset,
            isActivated: !checkEmail
        }

        return await orm.user.create(user);
    }

    async activate(activationLink: string) {
        const user = await orm.user.getOne({activationLink})
        if (!user) {
            throw ApiError.WrongActivationLinkError()
        }
        await orm.user.findAndUpdate({email: user.email}, {isActivated: true});
    }

    async updateUserLogs(email: string) {
        await orm.user.findAndUpdate({email}, {lastVisitDate: new Date()});
        await orm.user.findAndIncrementValue({email}, 'totalVisits', 1);
    }

    async checkPassword(email: string, password: string) {
        const user = await orm.user.getOne({email})
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        return passwordIsValid
    }

    async setNewPassword(email: string, newPassword: string) {
        const hashPassword = bcrypt.hashSync(newPassword, 7);
        await orm.user.findAndUpdate({email}, {password: hashPassword});
    }


    async validateStrike(email: string) {
        const user = await orm.user.getOne({email});

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
            await orm.user.findAndIncrementValue({"email": user.email}, 'strike', 1);
        }
    }

    async resetStrike(email: string) {
        await orm.user.findAndUpdate({email}, {strike: 1});
    }


    async update(email: string, newData: {}) {
        await orm.user.findAndUpdate({email}, newData)
    }
}