import { Logger } from "@nestjs/common";

export class EmailApi {
  private readonly logger = new Logger(EmailApi.name);
  private async init(pseudo: string, code: string, email: string) {
    const nodemailer = require("nodemailer");
    const { google } = require("googleapis");

    const CLIENT_ID =
      "1015065154139-1jv6q2lvthdjfbv5behue2dvnmulkolr.apps.googleusercontent.com";

    const CLIENT_SECRET = "MEETLIFE";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN =
      "1//04zMobNqKPVmyCgYIARAAGAQSNwF-L9IrLgDqQl8f95Bz2eCp9lDLRjucLyXuHvpUGepzKZixLIeVySsuUcgA3KXLxWjUpOD-WY0";

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "andyfahu@gmail.com",
          clientId:
            "1015065154139-1jv6q2lvthdjfbv5behue2dvnmulkolr.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken:
            "1//04zMobNqKPVmyCgYIARAAGAQSNwF-L9IrLgDqQl8f95Bz2eCp9lDLRjucLyXuHvpUGepzKZixLIeVySsuUcgA3KXLxWjUpOD-WY0",
          accessToken: accessToken,
        },
      });

      const mailOption = {
        from: "KingDom",
        to: `${email}`,
        subject: "Here’s Your Secret Code 🕵️",
        html: this.setHTML(pseudo, code),
      };
      return await transport.sendMail(mailOption);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private setHTML(pseudo: string, code: string): string {
    const html = ``;

    return html;
  }

  public async sendMail(pseudo: string, code: string, email: string) {
    try {
      await this.init(pseudo, code, email);
      this.logger.log(`📫 Confirmation Code Sended to ${pseudo}: ~ ${email} ~`);
    } catch (error) {
      this.logger.error(
        `📫 Error when sending Confirmation Code to ${pseudo}: ~ ${email} ==> ${error} ~`
      );
    }
  }
}
