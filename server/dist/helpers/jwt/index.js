"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const config_1 = require("../../config");
const jsonwebtoken_1 = require("jsonwebtoken");
/**
 * Create a short-lived access token (JWT) carrying user info.
 * Expires in 1 hour.
 */
const createAccessToken = (user) => (0, jsonwebtoken_1.sign)({
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    password: user.password,
    role: user.role
}, config_1.JWT_SECRET, { expiresIn: '1h' });
exports.createAccessToken = createAccessToken;
/**
 * Create a longer-lived refresh token (JWT).
 * Expires in 24 hours.
 */
const createRefreshToken = (user) => (0, jsonwebtoken_1.sign)(user, config_1.JWT_SECRET, { expiresIn: '24h' });
exports.createRefreshToken = createRefreshToken;
/**
 * Verify a JWT and extract the embedded user data.
 * Throws if the token is invalid or expired.
 */
const verifyToken = (token) => {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET);
        console.log('Decoded User:', decoded); // debug: show user payload
        // Return only the fields we need downstream
        const { id, username, email, avatar, password, role } = decoded;
        return { id, username, email, avatar, password, role };
    }
    catch (err) {
        console.error('Invalid token:', err);
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
