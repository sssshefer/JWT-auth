import {MongoOrm as orm} from "../orm/MongoOrm";
import TokenDomainService from "../../../core/domainService/TokenDomainService";
import jwt from "jsonwebtoken";
//todo remove dependency from mongoose Schema here
import {Schema} from "mongoose";
import {User} from "../../../core/domain/User";


export class TokenDomainServiceImpl implements TokenDomainService {
    generateTokens(payload: {}) {
        //todo change to env expiresIn
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '15d'})
        return {accessToken, refreshToken};
    }

    async validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
            return !!userData;
        } catch (e) {
            return false
        }

    }

    async validateRefreshToken(token: string) {
        try {

            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
            return !!userData;
        } catch (e) {
            return false
        }
    }

    async saveRefreshToken(userId: Schema.Types.ObjectId, refreshToken: string) {
        await orm.token.create(userId, refreshToken)
    }

    async removeToken(refreshToken: string) {
        await orm.token.deleteOne({refreshToken})
    }

    async findToken(refreshToken: string) {
        return await orm.token.getOne({refreshToken})
    }

    async removeAllUserTokens(userId: Schema.Types.ObjectId) {
        await orm.token.deleteMany({user: userId.toString()})
    }

    async getUserFromAccessToken(token: string) {
        //TODO change type to user from token
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as User;
    }

    async getUserFromRefreshToken(token: string) {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as User;
    }
}