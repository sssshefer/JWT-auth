import {Token} from "../domain/Token";
import {Schema} from "mongoose";
import {User} from "../domain/User";

interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export default interface tokenDomainService {

    saveRefreshToken(email: string, refreshToken: string): Promise<void>;

    removeToken(refreshToken: string): Promise<void>;

    findToken(refreshToken: string): Promise<Token>;

    removeAllUserTokens(email:string): Promise<void>;

}