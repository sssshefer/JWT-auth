import {IMyValidationError} from "./types/IMyValidationError";

//todo implement response as class and error will be a subclass of response
class MyError extends Error {
    success;//todo remove success and put to parent class Response
    code;
    errors;

    constructor(message: string, success: boolean, code: number, errors:IMyValidationError[] = []) {
        super(message);
        this.success = success;
        this.code = code;
        this.errors = errors;
    }

    static inputErrors(errors: IMyValidationError[]) {
        return new MyError('Input errors', false, 400, errors);
    }

    static inputError(msg: string, path: string) {
        return new MyError('Input error', false, 400, [{msg, path}]);
    }

}

export default MyError;