import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT!

const SERVER_URL = process.env.SERVER_URL!
const CLIENT_URL = process.env.CLIENT_URL!

const DATABASE_HOST = process.env.DATABASE_HOST!
const DATABASE_USER = process.env.DATABASE_USER!
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD!
const DATABASE_NAME = process.env.DATABASE_NAME!

const publicKey = process.env.IMAGEKIT_PUBLIC_KEY!
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT!

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

const JWT_SECRET = process.env.JWT_SECRET!

const SMTP_HOST = process.env.SMTP_HOST!;
const SMTP_PORT = process.env.SMTP_PORT!;
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;

export {
	PORT,
	SERVER_URL,
	CLIENT_URL,
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_USER,
	publicKey,
	privateKey,
	urlEndpoint,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	JWT_SECRET,
	SMTP_HOST,        // Добавлено
	SMTP_PORT,        // Добавлено
	SMTP_USER,        // Добавлено
	SMTP_PASS         // Добавлено
}
