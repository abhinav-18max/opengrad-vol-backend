import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import * as process from 'node:process';
import { UserService } from '../../user/user.service';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class MagicloginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicloginStrategy.name);
  private sesClient: SESClient;
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
    super({
      secret: process.env.MAGIC_SECRET,
      jwtOptions: {
        expiresIn: '1 day',
      },
      callbackUrl: 'http://localhost:5001/auth/login/callback',
      sendMagicLink: async (destination, href) => {
        try {
          this.sesClient = new SESClient({
            region: process.env.AWS_REGION,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
          });
          this.logger.log('SES client created');
          const FrontendUrl = process.env.MAGIC_LINK_URL;
          const token = await this.getTokenFromUrl(href);
          const magicLink = await this.createNewLink(FrontendUrl, token);

          const params = {
            Source: process.env.EMAIL,
            Destination: {
              ToAddresses: [destination],
            },
            Message: {
              Subject: {
                Data: 'OpenGrad Account Password Setting',
                Charset: 'UTF-8',
              },
              Body: {
                Text: {
                  Data: `Click on the following link to log in ${magicLink}`,
                  Charset: 'UTF-8',
                },
              },
            },
          };

          const command = new SendEmailCommand(params);
          await this.sesClient.send(command);
          this.logger.log(`Sending magic link to ${destination}`);
        } catch (err) {
          this.logger.error(err);
          console.log(err);
          return err;
        }
      },
      verify: async (payload, callback) =>
        callback(null, this.validate(payload)),
    });
  }
  async validate(payload: { destination: string }) {
    const user = await this.userService.checkEmail(payload.destination);

    return user;
  }
  async getTokenFromUrl(url: string) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('token');
  }

  async createNewLink(baseUrl: string, token: string) {
    const urlObj = new URL(baseUrl);
    urlObj.searchParams.set('token', token);
    return urlObj.toString();
  }
}
