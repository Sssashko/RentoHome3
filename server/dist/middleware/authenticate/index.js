"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../helpers/jwt");
/**
 * Verify JWT stored in cookies to authenticate requests.
 * On success, attach user object to req.user; on failure, respond with 401.
 */
const authenticate = (req, res, next) => {
    const token = req.cookies['accessToken'];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    try {
        // Decode and verify token signature
        const user = (0, jwt_1.verifyToken)(token);
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return res.status(401).json({ message: 'Invalid authentication token' });
        }
        // Attach user data to the request for downstream handlers
        req.user = user;
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid authentication token' });
    }
};
exports.default = authenticate;
