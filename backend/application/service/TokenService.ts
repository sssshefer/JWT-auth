import TokenDomainService from "../../core/domainService/TokenDomainService";
import jwt from "jsonwebtoken";
import UserDomainService from "../../core/domainService/UserDomainService";
import {User} from "../../core/domain/User";

export default class TokenService {
    constructor(readonly tokenDomainService: TokenDomainService) {}

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


    async saveRefreshToken(email: string, refreshToken: string) {
        await this.tokenDomainService.saveRefreshToken(email, refreshToken)
    }

    async removeToken(refreshToken: string) {
        return await this.tokenDomainService.removeToken(refreshToken);
    }

    async findToken(refreshToken: string) {
        return await this.tokenDomainService.findToken(refreshToken);
    }

    async removeAllUserTokens(email: string){
        return await this.tokenDomainService.removeAllUserTokens(email);
    }

    async getUserFromAccessToken(token: string) {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as User;
    }

    async getUserFromRefreshToken(token: string) {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as User;
    }
}