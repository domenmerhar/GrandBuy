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

  async sendConfirmEmail(verificationCode: string | number): Promise<void> {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: this.to,
      subject: "Potrdite vaš email naslov",
      text: `Spoštovani!
Hvala za registracijo, vaša koda je ${verificationCode}.
      
Lep pozdrav
Ekipa GrandBuy`,
    });
  }

  async sendResetPasswordEmail(
    resetPasswordToken: number | number
  ): Promise<void> {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: this.to,
      subject: "Resetirajte vaše geslo",
      text: `Spoštovani!
Vaša koda za resetiranje je ${resetPasswordToken}
      
Lep pozdrav
Ekipa GrandBuy`,
    });
  }

  async sendBanEmail(validUntil: Date): Promise<void> {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: this.to,
      subject: "Bili ste suspendirani",
      text: `Spoštovani!
Vaša suspenzija traja do ${validUntil.toDateString()}

Lep pozdrav
Ekipa GrandBuy`,
    });
  }

  async sendUnbanEmail(): Promise<void> {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: this.to,
      subject: "Bili ste odsuspendirani",
      text: `Spoštovani!
Vaša suspenzija je bila odstranjena
      
Lep pozdrav
Ekipa GrandBuy`,
    });
  }
}
