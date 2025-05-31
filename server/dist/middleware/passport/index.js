"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = require("../../config");
/**
 * Configure Passport to use Google OAuth 2.0.
 * - clientID/secret from env
 * - callbackURL: where Google redirects after login
 * - on success, returns Google profile object
 */
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.GOOGLE_CLIENT_ID,
    clientSecret: config_1.GOOGLE_CLIENT_SECRET,
    callbackURL: config_1.SERVER_URL + '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // profile contains Google user info (id, emails, displayName, photos)
    return done(null, profile);
}));
exports.default = passport_1.default;
