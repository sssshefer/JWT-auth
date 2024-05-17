import {ValidationError} from "express-validator";
class MyValidationError extends Error {
    status;
    errors;
    place;

    constructor(status: number, message: string, errors: ValidationError[] = [], place: string = '') {
        super(message);
        this.status = status;
        this.errors = errors;
        this.place = place;
    }

    static inputError(message: string, errors: ValidationError[] = [], place: string = '') {
        return new MyValidationError(400, message, errors, place);
    }

}

export default MyValidationError;