class ApiError extends Error {
    status;

    constructor(status:number, message:string) {
        super(message);
        this.status = status;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is not authorized')
    }

    static WrongActivationLinkError(){
        return new ApiError(400, 'Wrong activation Link')
    }
}
export default  ApiError
