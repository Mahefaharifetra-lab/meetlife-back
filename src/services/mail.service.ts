import { Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
@Injectable()
export class EmailApi {
  private readonly logger = new Logger(EmailApi.name);
  private CLIENT_ID: string =
    "1015065154139-1jv6q2lvthdjfbv5behue2dvnmulkolr.apps.googleusercontent.com";
  private CLIENT_SECRET: string = "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";
  private REDIRECT_URI: string =
    "https://developers.google.com/oauthplayground";
  private REFRESH_TOKEN: string =
    "1//04Gofn88h7swRCgYIARAAGAQSNwF-L9IrO3gzKTGQoILjONAuoaqfiW-LJRj146fgtDBqCFUGJE4eDp_Eoq4KB3mBQuoyHYLQgVs";
  private USER_EMAIL: string = "andyfahu@gmail.com";

  private async getAccessToken() {
    const oAuth2Client = new google.auth.OAuth2(
      this.CLIENT_ID,
      this.CLIENT_SECRET,
      this.REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: this.REFRESH_TOKEN });

    try {
      const { token } = await oAuth2Client.getAccessToken();
      return token;
    } catch (error) {
      throw error;
    }
  }

  private async createTransporter(accessToken: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: this.USER_EMAIL,
          clientId: this.CLIENT_ID,
          clientSecret: this.CLIENT_SECRET,
          refreshToken: this.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      return transporter;
    } catch (error) {
      this.logger.error("Failed to create transporter", error.stack);
      throw error;
    }
  }

  private generateHTML(user: CreateUserDto): string {
    return `
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Code de Vérification MeetLife</title>
          <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            h1 {
                font-size: 24px;
                color: #333333;
            }
            p {
                font-size: 16px;
                color: #555555;
                line-height: 1.6;
            }
            .code {
                font-size: 20px;
                font-weight: bold;
                color: #2a9d8f;
                padding: 10px;
                background-color: #e6f6f4;
                border: 1px solid #2a9d8f;
                display: inline-block;
                margin: 10px 0;
            }
            .footer {
                font-size: 14px;
                color: #888888;
                text-align: center;
                margin-top: 20px;
            }
            a {
                color: #2a9d8f;
                text-decoration: none;
            }
            .contact-info {
                margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bonjour ${user.pseudo},</h1>
            </div>
            <p>Nous avons reçu une demande de vérification de votre compte MeetLife. Pour confirmer votre identité et sécuriser votre compte, veuillez entrer le code de vérification suivant sur notre site :</p>
            <div class="code">
              Code de vérification : ${user.verificationCode}
            </div>
            <p>Ce code expirera dans <strong>10 minutes</strong>, alors assurez-vous de l'utiliser avant cette échéance.</p>
            <h2>Pourquoi cette vérification ?</h2>
            <p>Chez MeetLife, la sécurité de votre compte est notre priorité.</p>
            <p>Si vous avez des questions ou avez besoin d'aide, vous pouvez nous contacter à tout moment :</p>
            <div class="contact-info">
              <p><strong>Email :</strong> <a href="mailto:support@meetlife.com">support@meetlife.com</a></p>
              <p><strong>Téléphone :</strong> +261 545 855</p>
              <p><strong>Site web :</strong> <a href="https://meetlife.fr" target="_blank">meetlife.fr</a></p>
            </div>
            <p><strong>Mentions légales et informations de confidentialité :</strong><br>
            MeetLife respecte votre vie privée et protège vos données personnelles conformément à notre <a href="https://meetlife.fr/privacy" target="_blank">Politique de confidentialité</a>.</p>
            <div class="footer">
              <p>Merci de faire confiance à MeetLife,</p>
              <p>L'équipe MeetLife</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private async sendEmail(mailOptions: any) {
    try {
      const accessToken = await this.getAccessToken();
      const transporter = await this.createTransporter(accessToken);
      await transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully to ${mailOptions.to}`);
    } catch (error) {
      this.logger.error("Failed to send email", error.stack);
      throw error;
    }
  }

  public async sendVerificationEmail(user: CreateUserDto): Promise<void> {
    const mailOptions = {
      from: this.USER_EMAIL,
      to: user.email,
      subject: "Votre code de vérification MeetLife",
      html: this.generateHTML(user),
    };

    try {
      await this.sendEmail(mailOptions);
      this.logger.log(`Verification email sent successfully to ${user.email}`);
    } catch (error) {
      this.logger.error("Error sending verification email", error.stack);
    }
  }
}
