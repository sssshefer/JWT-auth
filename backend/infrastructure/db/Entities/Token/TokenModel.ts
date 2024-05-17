import {Schema, model} from 'mongoose';
import ITokenModel from "./ITokenModel";

const TokenSchema = new Schema<ITokenModel>({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    refreshToken: {type: String, required: true},
})

export default model<ITokenModel>('Token', TokenSchema);