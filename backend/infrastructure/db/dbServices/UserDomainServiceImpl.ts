import UserDomainService from "../../../core/domainService/UserDomainService";
import {MongoOrm as orm} from "../orm/MongoOrm";
import CreateUserDto from "../../../core/dtos/CreateUserDto";
import {UserMapper} from "../mappers/UserMapper";
import {User} from "../../../core/domain/User";

export class UserDomainServiceImpl implements UserDomainService {

    async checkUserExists(email: string) {
        try {
            return !!await orm.user.getOne({email});
        } catch (e) {
            return false;
        }
    }

    async getOneByEmail(email: string): Promise<User> {
        const mapper = new UserMapper()
        const user = await orm.user.getOne({email});
        return mapper.toDomain(user);

    }

    async getOneByActivationLink(activationLink: string): Promise<User>{
        const mapper = new UserMapper()
        const user = await orm.user.getOne({activationLink});
        return mapper.toDomain(user);
    }

    async create(dto: CreateUserDto): Promise<User>{
        const mapper = new UserMapper()
        const user = await orm.user.create(dto);
        return mapper.toDomain(user);
    }

    async incrementValue(email: string, field: string, value: number) {
        await orm.user.findAndIncrementValue({email}, field, value);
    }

    async update(email: string, newData: {}) {
        const mapper = new UserMapper()
        const user = await orm.user.findAndUpdate({email}, newData)
        return mapper.toDomain(user);
    }
}