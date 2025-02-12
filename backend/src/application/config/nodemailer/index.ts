import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME ?? "",
    pass: process.env.MAIL_APP_PASS ?? "",
  },
});

export default transporter;
