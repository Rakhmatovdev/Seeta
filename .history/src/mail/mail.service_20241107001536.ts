import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Learner } from "../learner/models/learner.model";


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailLearner(learner:Learner){
    const url = `${process.env.API_URL}:${process.env.PORT}/api/auth/activate/${learner.activation_link}`;
    await this.mailerService.sendMail({
      to: learner.email,
      subject: `Welcome to "SEETA" Lang Platform! `,
      template: "./confirm",
      context: {
        fullname: learner.fullname,
        url,
      },
    });
  }

}
