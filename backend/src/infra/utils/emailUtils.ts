import transporter from "../../application/config/nodemailer";
import { IEmailUtils } from "../../core/interfaces/utils/IEmailUtils";

//@ts-ignore
export default class EmailUtils implements IEmailUtils {
  public static sendSimpleMail(
    to: string,
    title: string,
    message: string
  ): void {
    const mailOptions = {
      to: to,
      subject: title,
      html: message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.info("E-mail sent!");
      }
    });
  }
}
