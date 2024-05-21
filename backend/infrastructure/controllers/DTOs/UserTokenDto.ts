import {User} from "../../../core/domain/User";

export default class UserTokenDto {
    constructor(
        readonly email: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly subscriptionStatus: string,
        readonly registrationDate: Date,
        readonly isActivated: boolean,
        readonly roles: string[],
        readonly timezoneOffset: number,
        readonly lastVisitDate: Date,
        readonly totalVisits: number,
        readonly strike: number,
    ) {
    }

    static fromUser(user: User): UserTokenDto {
        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            subscriptionStatus: user.subscriptionStatus,
            registrationDate: user.registrationDate,
            isActivated: user.isActivated,
            roles: user.roles,
            timezoneOffset: user.timezoneOffset,
            lastVisitDate: user.lastVisitDate,
            totalVisits: user.totalVisits,
            strike: user.strike
        };
    }

}