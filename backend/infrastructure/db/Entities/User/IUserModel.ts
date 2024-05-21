import {Schema, Types} from 'mongoose';


export default interface IUserModel extends Document {
    //TODO Do we need id here????
    _id: Schema.Types.ObjectId,
    email: string,
    password: string,
    roles: string[],
    isActivated: boolean,
    activationLink: string,
    firstName: string,
    lastName: string,
    subscriptionStatus: string,
    registrationDate: Date,
    lastVisitDate: Date,
    totalVisits: number,
    timezoneOffset: number,
    strike: number
}