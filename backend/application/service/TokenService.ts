import TokenDomainService from "../../core/domainService/TokenDomainService";
//todo remove dependency from mongoose Schema here
import {Schema} from "mongoose";

export default class TokenService {
    constructor(readonly tokenDomainService: TokenDomainService) {}

    generateTokens(payload: {}) {
        return  this.tokenDomainService.generateTokens(payload);
    }

    async validateAccessToken(token: string) {
        return await this.tokenDomainService.validateAccessToken(token);
    }

    async validateRefreshToken(token: string) {
        return await this.tokenDomainService.validateRefreshToken(token);
    }


    async saveRefreshToken(userId: Schema.Types.ObjectId, refreshToken: string) {
        return await this.tokenDomainService.saveRefreshToken(userId, refreshToken);
    }

    async removeToken(refreshToken: string) {
        return await this.tokenDomainService.removeToken(refreshToken);
    }

    async findToken(refreshToken: string) {
        return await this.tokenDomainService.findToken(refreshToken);
    }

    async removeAllUserTokens(userId: Schema.Types.ObjectId){
        return await this.tokenDomainService.removeAllUserTokens(userId);
    }

    async getUserFromAccessToken(token: string) {
        return await this.tokenDomainService.getUserFromAccessToken(token);
    }

    async getUserFromRefreshToken(token: string) {
        return await this.tokenDomainService.getUserFromRefreshToken(token);
    }
}