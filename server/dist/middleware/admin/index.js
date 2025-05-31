"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Allow only users with role "admin" to proceed.
 * If the user role is not admin, respond with 403 forbidden.
 */
const isAdmin = (req, res, next) => {
    const user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.role) !== 'admin') {
        return res.status(403).json({ message: 'Access restricted to administrators only' });
    }
    next();
};
exports.default = isAdmin;
