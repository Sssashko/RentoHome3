import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from 'config'

// configure Nodemailer transporter using SMTP credentials
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,               // your SMTP server address
  port: Number(SMTP_PORT),       // SMTP port (e.g. 587)
  secure: false,                 // use TLS? false = STARTTLS
  auth: {
    user: SMTP_USER,             // SMTP login user
    pass: SMTP_PASS,             // SMTP login password
  },
  tls: {
    rejectUnauthorized: false,   // allow self-signed certs
  },
})

/**
 * POST /send
 * Reads `to`, `subject`, `text` from request body and sends an email.
 * Returns 400 if any field is missing, 500 on failure.
 */
const sendEmailHandler = async (req: Request, res: Response) => {
  const { to, subject, text } = req.body

  // validate required fields
  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    // send the email
    await transporter.sendMail({
      from: SMTP_USER,   // sender address
      to,                // recipient address
      subject,           // email subject
      text,              // plain-text body
    })

    res.json({ message: 'Email sent successfully!' })
  } catch (error) {
    console.error('Email send error:', error)
    res.status(500).json({ message: 'Failed to send email' })
  }
}

export default sendEmailHandler
