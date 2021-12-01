import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

interface User {
  email: string;
  name: string;
}

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/api/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Nexxt-Price Registeration Confirmation`,
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
