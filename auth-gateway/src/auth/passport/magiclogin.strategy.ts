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
        expiresIn: '2 day',
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
                Data: ' Welcome to OpenGrad! Set Up Your Password Today',
                Charset: 'UTF-8',
              },
              Body: {
                Text: {
                  Data: `Hii,
                            We are thrilled to welcome you to the OpenGrad!

                            To get started, please set up your password by following the instructions below:

                            1. Visit the Password Setup Page: ${magicLink}

                            2. Create a New Password: Choose a strong password that you will easily remember. Your password should be at least 8 characters long and include a mix of upper and lower case letters, numbers, and special characters.
                           
                            3. Confirm Your New Password: Re-enter your new password to ensure it matches.

                            Please note that this email address ${destination} will be your login email for OpenGrad.

                            
                            Please use the following link within 24 hours to reset your password.
                            If you encounter any issues with the link or if you exceed the time limit,
                            please reach out to us for assistance.
                          
                            Please note that this is an auto-generated email, and replies to this email will not be monitored.

                            We look forward to collaborating with you and achieving great things together.

                            Best regards,

                            OpenGrad Team`,
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
