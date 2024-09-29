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

  async sendConfirmEmail(verificationCode: number): Promise<void> {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: this.to,
      subject: "Potrdite vaš email naslov",
      text: `Vaša koda je ${verificationCode}`,
    });
  }

  async sendResetPasswordEmail(resetPasswordToken: number): Promise<void> {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: this.to,
      subject: "Resetirajte vaše geslo",
      text: `Vaša koda za resetiranje je ${resetPasswordToken}`,
    });
  }

  async sendBanEmail(validUntil: Date): Promise<void> {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: this.to,
      subject: "Bili ste suspendirani",
      text: `Vaša suspenzija traja do ${validUntil.toDateString()}`,
    });
  }

  async sendUnbanEmail(): Promise<void> {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: this.to,
      subject: "Bili ste odsuspendirani",
      text: `Vaša suspenzija je bila odstranjena`,
    });
  }
}
