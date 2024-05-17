import {Schema, model, Types} from 'mongoose'
import IUserModel from "./IUserModel";


const userSchema = new Schema<IUserModel>({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    //todo change from string to array
    roles: {type: String, default: "USER"},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, required: true},
    firstName: {type: String, default: "set your first name here"},
    lastName: {type: String, default: "set your last name here"},
    subscriptionStatus: {type: String, default: "free"},
    endOfSubscription: {type: Date},
    registrationDate: {type: Date, default: new Date()},
    lastVisitDate: {type: Date, default: new Date()},
    totalVisits: {type: Number, default: 1},
    timezoneOffset: {type: Number, default: 0, required: true},
    strike: {type: Number, default: 1},
})



export const UserModel = model<IUserModel>('User', userSchema)