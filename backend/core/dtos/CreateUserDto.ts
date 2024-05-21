//This serves as interface for the UserDomainService
//Like what do we need to create a user in the database but abstracted

export default class CreateUserDto {
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
    ) {
    }
}