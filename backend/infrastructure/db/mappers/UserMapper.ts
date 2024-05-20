import {User} from "../../../core/domain/User";
import IUserModel from "../Entities/User/IUserModel";

interface DbMapper<D, E> {
    toDomain(entity: E): D;
}

export class UserMapper implements DbMapper<User, IUserModel> {
    toDomain(entity: IUserModel): User{
        return {
            _id: entity._id,
            email: entity.email,
            password: entity.password,
            roles: entity.roles,
            isActivated: entity.isActivated,
            activationLink: entity.activationLink,
            firstName: entity.firstName,
            lastName: entity.lastName,
            subscriptionStatus: entity.subscriptionStatus,
            endOfSubscription: entity.endOfSubscription,
            registrationDate: entity.registrationDate,
            lastVisitDate: entity.lastVisitDate,
            totalVisits: entity.totalVisits,
            timezoneOffset: entity.timezoneOffset,
            strike: entity.strike,
        };
    }
}