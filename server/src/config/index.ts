import dotenv from 'dotenv'

dotenv.config()  // load .env into process.env

// Server & client ports/URLs
const PORT = process.env.PORT!                   // server listens on this port
const SERVER_URL = process.env.SERVER_URL!       // backend base URL
const CLIENT_URL = process.env.CLIENT_URL!       // frontend base URL

// Database connection settings
const DATABASE_HOST = process.env.DATABASE_HOST!         
const DATABASE_USER = process.env.DATABASE_USER!         
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD! 
const DATABASE_NAME = process.env.DATABASE_NAME!         

// ImageKit credentials
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY!      // ImageKit public key
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!    // ImageKit private key
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT!  // ImageKit URL endpoint

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!       
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET! 

// JWT for auth
const JWT_SECRET = process.env.JWT_SECRET!    // secret used to sign JWT tokens

// SMTP (email) settings
const SMTP_HOST = process.env.SMTP_HOST!      // mail server host
const SMTP_PORT = process.env.SMTP_PORT!      // mail server port
const SMTP_USER = process.env.SMTP_USER!      // SMTP username
const SMTP_PASS = process.env.SMTP_PASS!      // SMTP password

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
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS
}
