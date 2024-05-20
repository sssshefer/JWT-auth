import {Schema} from "mongoose";

export class User {
    constructor(
        readonly _id: Schema.Types.ObjectId,
       readonly email: string,
       readonly password: string,
       //todo change from string to array
       readonly roles: string,
       readonly isActivated: boolean,
       readonly activationLink:  string ,
       readonly firstName: string,
       readonly lastName: string,
       readonly subscriptionStatus: string,
       readonly endOfSubscription: Date ,
       readonly registrationDate: Date,
       readonly lastVisitDate: Date,
       readonly totalVisits: number,
       readonly timezoneOffset: number,
       readonly strike: number,
    ) {}
}