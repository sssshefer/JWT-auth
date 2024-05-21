import {User} from "../domain/User";
import CreateUserDto from "../dtos/CreateUserDto";

export default interface UserDomainService {

    checkUserExists(email: string): Promise<boolean>;

    getOneByEmail(email: string): Promise<User>;

    getOneByActivationLink(activationLink: string): Promise<User>;

    create(dto:CreateUserDto): Promise<User>;

    incrementValue(email: string, field: string, value: number): Promise<void>;

    update(email: string, newData: {}): Promise<User>;
}