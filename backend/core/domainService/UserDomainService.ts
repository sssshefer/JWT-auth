import {User} from "../domain/User";

export default interface UserDomainService {

    checkUserExists(email: string): Promise<boolean>;

    getOneByEmail(email: string): Promise<User>;

    signup(email: string, password: string, timezoneOffset: number, checkEmail:boolean): Promise<User>;

    activate(activationLink: string): Promise<void>;

    updateUserLogs(email: string): Promise<void>;

    checkPassword(email: string, password: string): Promise<boolean>;

    setNewPassword(email: string, newPassword: string): Promise<void>;

    validateStrike(email: string): Promise<void>;

    resetStrike(email: string): Promise<void>;

    update(email: string, newData: {}): Promise<void>;
}