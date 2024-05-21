import {MongoOrm as orm} from "../orm/MongoOrm";
import TokenDomainService from "../../../core/domainService/TokenDomainService";

export class TokenDomainServiceImpl implements TokenDomainService {

    async saveRefreshToken(email:string, refreshToken: string) {
        const userId = (await orm.user.getOne({email}))._id
        await orm.token.create(userId, refreshToken)
    }

    async removeToken(refreshToken: string) {
        await orm.token.deleteOne({refreshToken})
    }

    async findToken(refreshToken: string) {
        return await orm.token.getOne({refreshToken})
    }

    async removeAllUserTokens(email:string) {
        const userId = (await orm.user.getOne({email}))._id
        await orm.token.deleteMany({user: userId.toString()})
    }

}