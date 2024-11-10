import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { config } from "../../config";

interface VerifyEmailProperties {
  to: string;
  token: string;
  id: number;
  subject?: string;
  text?: string;
}
export const sendEmailVerification = async ({
  id,
  to,
  token,
  subject = "Account verification",
  text = "Verify your account here:",
}: VerifyEmailProperties): Promise<SMTPTransport.SentMessageInfo | undefined> => {
  const mailOptions = {
    from: config.MAIL.FROM,
    to: to,
    subject: subject,
    text: `${text} ${config.BASE_URL}:${config.PORT}/api/auth/emailVerification/${id}/${encodeURIComponent(token)}`,
  };

  const transporter = nodemailer.createTransport({
    service: config.MAIL.SERVICE,
    host: config.MAIL.HOST,
    port: config.MAIL.PORT,
    secure: config.MAIL.SECURE,
    auth: {
      user: config.MAIL.AUTH.USER,
      pass: config.MAIL.AUTH.PASS,
    },
  });

  let mailResponse: SMTPTransport.SentMessageInfo | undefined;
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) throw error;
    mailResponse = info;
  });
  return mailResponse;
};
