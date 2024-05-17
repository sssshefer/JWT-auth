import {Schema} from "mongoose";

export default interface ITokenModel extends Document{
    user: Schema.Types.ObjectId,
    refreshToken: string,
}