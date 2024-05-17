import {NextFunction, Request, Response} from "express";
import {IMyEmailService} from "../../application/IMyEmailService";

export class EmailController {
    constructor(readonly emailService: IMyEmailService) {
    }
    async sendEmailToWripet(req: Request, res: Response, next: NextFunction) {
        try {
            const {firstName, lastName, senderEmail, message}  = req.body;
            const result = await this.emailService.sendEmailToWripet(senderEmail, firstName, lastName, message);
            res.send(result)
        } catch (e) {
            next(e);
        }
    }
}

