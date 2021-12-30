import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
interface User {
  email: string;
  name: string;
}

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.configService.get(
      'API_URL',
    )}/api/auth/confirm?token=${token}`;

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
