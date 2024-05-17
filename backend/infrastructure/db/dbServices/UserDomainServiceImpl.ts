import UserDomainService from "../../../core/domainService/UserDomainService";
import bcrypt from "bcryptjs";
import {v4} from "uuid";
import ApiError from "../../exceptions/apiError";

//TODO Remove dependence from orm
import {MongoOrm as orm} from "../orm/MongoOrm";

export class UserDomainServiceImpl implements UserDomainService {
    async getAll() {
        return await orm.user.getAll();
    }

    async getOneByEmail(email: string) {
        return orm.user.getOne({email});
    }

    async getOne(key:string, value:any) {
        return orm.user.getOne({key:value});
    }

    async checkUserExists(email: string) {
        try{
            return !!await orm.user.getOne({email});
        }catch (e){
            return false;
        }
    }


    async register(email: string, password: string, timezoneOffset: number) {
        const hashedPassword = bcrypt.hashSync(password, 7);
        const activationLink = v4()//random id for activation link
        const user = {
            email: email,
            password: hashedPassword,
            activationLink: activationLink,
            timezoneOffset: timezoneOffset,
        }
        return await orm.user.create(user);
    }



    async activate(activationLink: string) {
        const user = await orm.user.getOne({activationLink})
        if (!user) {
            throw ApiError.WrongActivationLinkError()
        }
        //update isActivated of the user
        await orm.user.findAndUpdate({email:user.email}, {isActivated:true});
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

    async checkSubscription(endOfSubscription: Date) {
        return (endOfSubscription > new Date())
    }

    async removeSubscription(email: string) {
       await orm.user.findAndUpdate({email}, {subscriptionStatus: 'Free'});
    }

    async validateStrike(email:string) {
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
            await orm.user.findAndIncrementValue({"email":user.email}, 'strike', 1);
        }
    }

    async resetStrike(email: string) {
        await orm.user.findAndUpdate({email}, {strike: 1});
    }


    async validateSubscriptionStatus(email:string) {
        const user = await orm.user.getOne({email});
        if (user.subscriptionStatus === 'Paid' && !(await this.checkSubscription(user.endOfSubscription))) {
            await this.removeSubscription(email);
        }
    }

    async update(email:string, newData:{}){
       await orm.user.findAndUpdate({email}, newData)
    }
}