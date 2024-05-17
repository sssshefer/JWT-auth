import ApiError from '../exceptions/apiError';
import MyValidationError from '../exceptions/myValidationError';
import {Request,Response, NextFunction} from 'express';

export default function (err:Error, req:Request, res:Response, next:NextFunction) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    if(err instanceof MyValidationError){
        return res.status(err.status).json({message:err.message, errors:err.errors, place:err.place})
    }
    return res.status(500).json({message: 'Unexpected error'})
};