export default class RegisterUserDto {
    constructor(
        readonly email: string,
        readonly password: string,
        readonly activationLink:  string ,
        readonly timezoneOffset: number,
    ) {}
}