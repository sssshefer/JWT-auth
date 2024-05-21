export class User {
    constructor(
       readonly email: string,
       readonly password: string,
       readonly roles: string[],
       readonly isActivated: boolean,
       readonly activationLink:  string ,
       readonly firstName: string,
       readonly lastName: string,
       readonly subscriptionStatus: string,
       readonly registrationDate: Date,
       readonly lastVisitDate: Date,
       readonly totalVisits: number,
       readonly timezoneOffset: number,
       readonly strike: number,
    ) {}
}