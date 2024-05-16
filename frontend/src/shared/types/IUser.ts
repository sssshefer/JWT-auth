export interface IUser {
    email: string;
    roles: string;
    isActivated: boolean;
    firstName: string;
    lastName: string;
    subscriptionStatus: string;
    registrationDate: Date;
    lastVisitDate: Date;
    totalVisits: number;
    timezoneOffset: number;
    strike: number;
}