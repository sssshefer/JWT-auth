export interface IUser {
    email: string;
    //TODO change roles to array
    roles: string;
    isActivated: boolean;
    firstName: string;
    lastName: string;
    subscriptionStatus: string;
    registrationDate: string;
    lastVisitDate: string;
    totalVisits: number;
    timezoneOffset: number;
    strike: number;
}