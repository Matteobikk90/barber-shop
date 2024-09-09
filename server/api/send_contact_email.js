import nodemailer from "nodemailer";
import "dotenv/config";

// Reuse the same transporter object to improve efficiency
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  from: process.env.EMAIL,
  port: 587,
  secure: false,
  requireTLS: true,
});

export default async function (req, res) {
  if (req.method === "POST") {
    const { name, email, phone, message } = req.body;

    const emailTemplateBody = `
      <p>Nome: <strong>${name}</strong>,</p>
      <p>Telefono: <strong>${phone}</strong></p>
      <p>Email: <strong>${email}</strong>:</p>
      <p>Messaggio: <strong>${message}</strong></p>
    `;

    const mail_configs = {
      from: process.env.EMAIL,
      to: email,
      subject: `Informazioni da ${name}`,
      html: emailTemplateBody,
    };

    try {
      await transporter.sendMail(mail_configs);
      return res.status(200).send("Email correctly sent");
    } catch (error) {
      return res.status(500).send("Email not sent");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
