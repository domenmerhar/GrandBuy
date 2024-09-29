import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export class Email {
  constructor(private to: string) {}

  async sendConfirmEmail(verificationCode: number) {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: this.to,
      subject: "Potrdite vaš email naslov",
      text: `Vaša koda je ${verificationCode}`,
    });
  }

  async sendResetPasswordEmail(resetPasswordToken: number) {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: this.to,
      subject: "Resetirajte vaše geslo",
      text: `Vaša koda za resetiranje je ${resetPasswordToken}`,
    });
  }
}
