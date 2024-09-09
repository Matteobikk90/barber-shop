import nodemailer from "nodemailer";
import "dotenv/config";

// Define transporter globally to avoid re-creating it in every request
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
    const { name, surname, email, phone, readable_start_time, service } =
      req.body;

    const emailTemplateBody = `
      <p>Ciao <strong>${name},</strong></p>
      <p>Di seguito i dettagli della tua prenotazione:</p>
      <p>&nbsp;</p>
      <p>Nome: <strong>${name}</strong></p>
      <p>Cognome: <strong>${surname}</strong></p>
      <p>Email: <strong>${email}</strong></p>
      <p>Telefono: <strong>${phone}</strong></p>
      <p>Data: <strong>${readable_start_time}</strong></p>
      <p>Servizio: <strong>${service}</strong></p>
      <p>&nbsp;</p>
      <p>Saluti,</p>
      <p>Blendon Barber Shop</p>
    `;

    const mail_configs = {
      from: process.env.EMAIL,
      to: email,
      subject: "Blendon Barber Shop - Prenotazione effettuata con successo",
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
