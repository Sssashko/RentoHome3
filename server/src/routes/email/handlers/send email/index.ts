import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from 'config';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,  
  port: Number(SMTP_PORT),
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ✅ Игнорируем самоподписанный сертификат
  },
});

const sendEmailHandler = async (req: Request, res: Response) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to,
      subject,
      text,
    });

    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

export default sendEmailHandler;
