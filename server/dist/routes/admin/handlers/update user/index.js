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
const database_1 = __importDefault(require("../../../../database"));
const bcrypt_1 = require("bcrypt");
/**
 * Update provided user fields: username, email, password, avatar URL.
 */
function handleUpdateAnyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // parse ID and input fields
            const id = Number(req.params.id);
            const { username, email, password } = req.body;
            const avatarFile = req.file;
            // prepare arrays for SET clauses and parameters
            const updates = [];
            const params = [];
            if (username) {
                updates.push('username = ?');
                params.push(username);
            }
            if (email) {
                updates.push('email = ?');
                params.push(email);
            }
            // hash and add password update
            if (password) {
                const hashed = yield (0, bcrypt_1.hash)(password, 10); // saltRounds = 10
                updates.push('password = ?');
                params.push(hashed);
            }
            // build avatar URL and add update
            if (avatarFile) {
                const avatarUrl = `${process.env.SERVER_URL}/images/${avatarFile.filename}`;
                updates.push('avatar = ?');
                params.push(avatarUrl);
            }
            // if no fields to update, return error
            if (!updates.length) {
                return res.status(400).json({ message: 'No fields to update' });
            }
            // execute dynamic UPDATE query
            const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
            params.push(id);
            yield database_1.default.query(sql, params);
            // fetch and return updated user (excluding password)
            const [rows] = yield database_1.default.query('SELECT id, username, email, avatar, role FROM users WHERE id = ?', [id]);
            return res.json(rows[0]);
        }
        catch (err) {
            console.error('UpdateAnyUser error:', err);
            return res.status(500).json({ message: 'Failed to update user' });
        }
    });
}
exports.default = handleUpdateAnyUser;
