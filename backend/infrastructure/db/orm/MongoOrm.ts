import {UserModel} from "../Entities/User/UserModel";
import IUserModel from "../Entities/User/IUserModel";
import CreateUserDto from "../../../core/dtos/CreateUserDto";
import TokenModel from "../Entities/Token/TokenModel";
import {Schema} from "mongoose";
import ITokenModel from "../Entities/Token/ITokenModel";

export const MongoOrm = {
    user: {
        findAndUpdate: async (by: {}, newData: {}): Promise<IUserModel> => {
            return UserModel.findOneAndUpdate(by, newData).orFail()
        },

        getOne: async (by: {}): Promise<IUserModel> => {
            //todo probably remove orFail
            return UserModel.findOne(by).orFail()
        },


        create: async (registerUserDto: CreateUserDto): Promise<IUserModel> => {
            const user = new UserModel(registerUserDto)
            await user.save()
            return user;
        },

        findAndIncrementValue: async (by: {}, key: string, value: number): Promise<IUserModel> => {
            return UserModel.findOneAndUpdate(by, {$inc: {[key]: value}}).orFail()
        }
    },

    token: {
        // findAndUpdate: async (by: {}, newData: {}): Promise<ITokenModel> => {
        //     //const mapper = new TokenMapper()
        //     return TokenModel.findOneAndUpdate(by, newData).orFail()
        //     //return mapper.toDomain(token);
        // },

        create: async (userId: Schema.Types.ObjectId, refreshToken: string) => {
            const newToken = new TokenModel({user: String(userId), refreshToken})
            await newToken.save()
        },

        getOne: async (by: {}): Promise<ITokenModel> => {
            return TokenModel.findOne(by).orFail()
        },

        deleteOne: async (by: {}): Promise<void> => {
            await TokenModel.deleteOne(by)
        },

        deleteMany: async (by: {}): Promise<void> => {
            await TokenModel.deleteMany(by)
        }
    },
}