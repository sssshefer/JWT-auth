export interface IMyEmailService {
    sendActivationMail(to:string, link:string): Promise<void>,
    sendNewPasswordMail(to:string, password:string): Promise<void>,
    sendPasswordIsChangedMail(to:string): Promise<void>,
    sendEmailToWripet(senderEmail:string  , firstName:string, lastName:string, message:string): Promise<void>
}