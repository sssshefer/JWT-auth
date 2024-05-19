import {IFormError} from "./IFormError";

export function successResponseMapper(data?:any) {
    return {
        //todo make message field optional
        message: 'Success',
        success: true,
        code: 200,
        //todo change data to body
        data
    }
}

