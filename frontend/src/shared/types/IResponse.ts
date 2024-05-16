import {IFormError} from "./IFormError";

export interface IResponse  {
    message: string;
    success: boolean;
    code: number;
    errors?: IFormError[]
    data?: any;
}