"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../../../config");
// configure Nodemailer transporter using SMTP credentials
const transporter = nodemailer_1.default.createTransport({
    host: config_1.SMTP_HOST,
    port: Number(config_1.SMTP_PORT),
    secure: false,
    auth: {
        user: config_1.SMTP_USER,
        pass: config_1.SMTP_PASS, // SMTP login password
    },
    tls: {
        rejectUnauthorized: false, // allow self-signed certs
    },
});
/**
 * POST /send
 * Reads `to`, `subject`, `text` from request body and sends an email.
 * Returns 400 if any field is missing, 500 on failure.
 */
const sendEmailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, text } = req.body;
    // validate required fields
    if (!to || !subject || !text) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // send the email
        yield transporter.sendMail({
            from: config_1.SMTP_USER,
            to,
            subject,
            text, // plain-text body
        });
        res.json({ message: 'Email sent successfully!' });
    }
    catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});
exports.default = sendEmailHandler;
