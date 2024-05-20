import {User} from "../../../core/domain/User";
import {UserMapper} from "../mappers/UserMapper";
import {UserModel} from "../Entities/User/UserModel";
import IUserModel from "../Entities/User/IUserModel";
import RegisterUserDto from "../../../application/dtos/RegisterUserDto";
import {Token} from "../../../core/domain/Token";
import {TokenMapper} from "../mappers/TokenMapper";
import TokenModel from "../Entities/Token/TokenModel";
import {Schema} from "mongoose";

export const MongoOrm = {
    user: {
        findAndUpdate: async (by: {}, newData: {}): Promise<User|undefined> => {
            const mapper = new UserMapper()
            const user = await UserModel.findOneAndUpdate(by, newData).orFail()
            return mapper.toDomain(user);
        },

        getOne: async (by: {}): Promise<User> => {
            const mapper = new UserMapper()
            const user = await UserModel.findOne(by).orFail()
            return mapper.toDomain(user);
        },

        getAll: async (): Promise<User[]> => {
            const mapper = new UserMapper()
            const users = await UserModel.find().orFail()
            return users.map((user: IUserModel) => mapper.toDomain(user));
        },


        create: async (registerUserDto: RegisterUserDto) => {
            const mapper = new UserMapper()
            const user = new UserModel(registerUserDto)
            await user.save()
            return mapper.toDomain(user)
        },
        remove: () => {
        },

        findAndIncrementValue: async (by: {}, key: string, value: number): Promise<User> => {
            const mapper = new UserMapper()
            const user = await UserModel.findOneAndUpdate(by, {$inc: {[key]: value}}).orFail()
            return mapper.toDomain(user);
        }
    },

    token: {

        findAndUpdate: async (by: {}, newData: {}): Promise<Token> => {
            const mapper = new TokenMapper()
            const token = await TokenModel.findOneAndUpdate(by, newData).orFail()
            return mapper.toDomain(token);
        },
        create: async (userId: Schema.Types.ObjectId, refreshToken: string) => {
            const mapper = new TokenMapper()
            const newToken = new TokenModel({user:String(userId), refreshToken})
            await newToken.save()

        },
        getOne: async (by: {}): Promise<Token> => {
            const mapper = new TokenMapper()
            const token = await TokenModel.findOne(by).orFail()
            return mapper.toDomain(token);
        },

        deleteOne: async (by: {}): Promise<void> => {
            await TokenModel.deleteOne(by)
        },

        deleteMany: async (by: {}): Promise<void> => {
            await TokenModel.deleteMany(by)
        }
    },
}