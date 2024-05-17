import {User} from "../domain/User/User";

export default interface UserDomainService {
    getAll(): Promise<User[]>;

    checkUserExists(email: string): Promise<boolean>;

    getOne(key: string, value: any): Promise<User>;

    getOneByEmail(email: string): Promise<User>;

    register(email: string, password: string, timezoneOffset: number): Promise<User>;

    activate(activationLink: string): Promise<void>;

    updateUserLogs(email: string): Promise<void>;

    checkPassword(email: string, password: string): Promise<boolean>;

    setNewPassword(email: string, newPassword: string): Promise<void>;

    checkSubscription(endOfSubscription: Date): Promise<boolean>;

    removeSubscription(email: string): Promise<void>;

    validateStrike(email: string): Promise<void>;

    resetStrike(email: string): Promise<void>;

    validateSubscriptionStatus(email: string): Promise<void>;

    update(email: string, newData: {}): Promise<void>;
}