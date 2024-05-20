import {Token} from "../domain/Token";
import {Schema} from "mongoose";
import {User} from "../domain/User";

interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export default interface tokenDomainService {
    generateTokens(payload: {}): ITokens;

    validateAccessToken(token: string): Promise<boolean>;

    validateRefreshToken(token: string): Promise<boolean>;


    saveRefreshToken(userId: Schema.Types.ObjectId, refreshToken: string): Promise<void>;

    removeToken(refreshToken: string): Promise<void>;

    findToken(refreshToken: string): Promise<Token>;

    removeAllUserTokens(userId: Schema.Types.ObjectId): Promise<void>;

    getUserFromAccessToken(token: string): Promise<User>;

    getUserFromRefreshToken(token: string): Promise<User>;
}