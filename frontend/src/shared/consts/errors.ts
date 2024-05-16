import {IResponse} from "../types/IResponse";

export const unexpectedErrorResponse:IResponse = {
    message: "Unexpected error",
    success: false,
    code:500
}