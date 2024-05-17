import {Schema} from "mongoose";

export class Token{
    constructor(
        readonly user: Schema.Types.ObjectId,
        readonly refreshToken: string,
    ) {}

}