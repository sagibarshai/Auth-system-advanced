import nodemailer from "nodemailer";

import { config } from "../../config";
import {
  NewEmailVerificationModel,
  ReturnedEmailVerification,
  SelectEmailVerificationModel,
  UpdateEmailVerificationModel,
} from "../../features/auth/models";

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
}: VerifyEmailProperties): Promise<ReturnedEmailVerification | undefined> => {
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

  const afterSendCallback = async (status: "success" | "failure") => {
    const existsEmailVerification = await SelectEmailVerificationModel(to);
    if (!existsEmailVerification) {
      return await NewEmailVerificationModel({ email: to, isSent: status === "success", userId: id });
    }
    return UpdateEmailVerificationModel({ email: to, isSent: status === "success", userId: id });
  };

  try {
    await transporter.sendMail(mailOptions);
    return await afterSendCallback("success");
  } catch (err) {
    return await afterSendCallback("failure");
  }
};
