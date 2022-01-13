"use strict";
const nodemailer = require("nodemailer");
const { HTTP_SERVER_DOMAIN, SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } =
  process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

async function sendMailConfirmationBooking(name, email) {
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: "Noticias Hygge - Reserva confirmada!",
    text: `Hola ${name},\n Tu reserva ya está confirmada, 
    solo queda celebrar el evento en tu Hygge espacio.`,
    html: `<h1>Hola ${name},</h1> buenas noticias, tu Hygge espacio te espera.`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendMailCancelBooking(name, email) {
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: "ReviewsHygge - Booking!",
    text: `Hola ${name},\n sentimos mucho no poder ofrecerte el espacio escogido.
    Tienes a tu disposición otros espacios que podrían cumplir con tus necesidades.
    Estamos a tu disposición para si necesitas ayuda.
    Saludos cordiales de la administración de Hygge. `,
    html: `<h1>Hola ${name},</h1> tu reserva no hay podido ser validada.`,
  };
}
module.exports = {
  sendMailConfirmationBooking,
  sendMailCancelBooking,
};
