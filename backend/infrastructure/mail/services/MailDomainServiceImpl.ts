import nodemailer from 'nodemailer';

export class MailDomainServiceImpl  {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,//todo find out what it is
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            },
        })
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            to,
            from: `Wripet <${process.env.SMTP_USER}>`,
            subject: 'Activation of account on ' + process.env.CLIENT_URL,
            text: '',
            html:
                `
                    <div>
                   
                
                        <h3 style=" font-family: 'Montserrat', sans-serif, Arial;
                    color:#1d1d1d;">You received this message because you created a new wripet.com account on educational site https://wripet.com.</h3>
                        <h3 style=" font-family: 'Montserrat', sans-serif, Arial;
                    color:#1d1d1d;">Please proceed to the following link to confirm your email address:</h3>
                        <a href="${link}">${link}</a>
                        <h3  style=" font-family: 'Montserrat', sans-serif, Arial;
                    color:#1d1d1d;">Best regards, wripet.com</h3> 
                        
                    </div>
                `
        })
    }

    async sendNewPasswordMail(to: string, password: string) {
        await this.transporter.sendMail({
            to,
            from: `Wripet <${process.env.SMTP_USER}>`,
            subject: 'Request for a new password on ' + process.env.CLIENT_URL,
            text: '',
            html: `
                    <div>
                        <h3 style=" font-family: 'Montserrat', sans-serif, Arial;
                    color:#1d1d1d;">You received this message because you require a new password for wripet.com account on educational site https://wripet.com.</h3>
                        <h3 style=" font-family: 'Montserrat', sans-serif, Arial;
                    color:#1d1d1d;">Here is your new password:</h3>
                        <h3 style=" font-family: 'Montserrat', sans-serif, Arial;
                    color:#1d1d1d;"><bold>${password}</bold></h3>
                        <h3  style=" font-family: 'Montserrat', sans-serif, Arial;
                    color:#1d1d1d;">Best regards, wripet.com</h3> 
                        
                    </div>
                `
        })
    }

    async sendPasswordIsChangedMail(to: string) {
        await this.transporter.sendMail({
            to,
            from: `Wripet <${process.env.SMTP_USER}>`,
            subject: 'Someone has changed your password on ' + process.env.CLIENT_URL,
            text: '',
            html: `
                    <div>
                        <h3 style=" font-family: 'Montserrat', sans-serif, Arial;
                    color:#1d1d1d;">You received this message because the password for your account on https://wripet.com has been changed</h3>
                        <h3 style=" font-family: 'Montserrat', sans-serif, Arial;
                    color:#1d1d1d;">If it wasn't you recover and change your password as soon as possible</h3>
                 
                        <h3  style=" font-family: 'Montserrat', sans-serif, Arial;
                    color:#1d1d1d;">Best regards, wripet.com</h3> 
                        
                    </div>
                `
        })
    }
}

