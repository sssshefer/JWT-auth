import MailDomainService from "../../core/domainService/MailDomainService";

export default class MailService {
    constructor(readonly mailDomainService: MailDomainService) {}

    sendActivationMail(to: string, link: string) {
        return this.mailDomainService.sendActivationMail(to, link);
    }

    sendNewPasswordMail(to: string, password: string) {
        return this.mailDomainService.sendNewPasswordMail(to, password);
    }

    sendPasswordIsChangedMail(to: string) {
        return this.mailDomainService.sendPasswordIsChangedMail(to);
    }
}