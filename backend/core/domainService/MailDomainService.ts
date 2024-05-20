export default interface MailDomainService {
    sendActivationMail(to: string, link: string): Promise<void>,

    sendNewPasswordMail(to: string, password: string): Promise<void>,

    sendPasswordIsChangedMail(to: string): Promise<void>,
}