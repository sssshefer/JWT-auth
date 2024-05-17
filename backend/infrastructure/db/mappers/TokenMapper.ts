import {Token} from "../../../core/domain/Token/Token";
import ITokenModel from "../Entities/Token/ITokenModel";

interface DbMapper<D, E> {
    toDomain(entity: E): D;
}

export class TokenMapper implements DbMapper<Token, ITokenModel> {
    toDomain(entity: ITokenModel): Token {
        return {
            user: entity.user,
            refreshToken: entity.refreshToken
        };
    }
}