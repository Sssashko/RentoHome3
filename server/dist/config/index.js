"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP_PASS = exports.SMTP_USER = exports.SMTP_PORT = exports.SMTP_HOST = exports.JWT_SECRET = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.urlEndpoint = exports.privateKey = exports.publicKey = exports.DATABASE_USER = exports.DATABASE_PASSWORD = exports.DATABASE_NAME = exports.DATABASE_HOST = exports.CLIENT_URL = exports.SERVER_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load .env into process.env
// Server & client ports/URLs
const PORT = process.env.PORT; // server listens on this port
exports.PORT = PORT;
const SERVER_URL = process.env.SERVER_URL; // backend base URL
exports.SERVER_URL = SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL; // frontend base URL
exports.CLIENT_URL = CLIENT_URL;
// Database connection settings
const DATABASE_HOST = process.env.DATABASE_HOST;
exports.DATABASE_HOST = DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
exports.DATABASE_USER = DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
exports.DATABASE_PASSWORD = DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
exports.DATABASE_NAME = DATABASE_NAME;
// ImageKit credentials
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY; // ImageKit public key
exports.publicKey = publicKey;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY; // ImageKit private key
exports.privateKey = privateKey;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT; // ImageKit URL endpoint
exports.urlEndpoint = urlEndpoint;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET;
// JWT for auth
const JWT_SECRET = process.env.JWT_SECRET; // secret used to sign JWT tokens
exports.JWT_SECRET = JWT_SECRET;
// SMTP (email) settings
const SMTP_HOST = process.env.SMTP_HOST; // mail server host
exports.SMTP_HOST = SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT; // mail server port
exports.SMTP_PORT = SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER; // SMTP username
exports.SMTP_USER = SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS; // SMTP password
exports.SMTP_PASS = SMTP_PASS;
