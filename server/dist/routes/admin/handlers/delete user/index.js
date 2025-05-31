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
/**
 * Delete a user only if they have no active listings.
 */
function handleDeleteAnyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = Number(req.params.id);
        try {
            // 1) Count how many listings this user has
            const [[{ cnt }]] = yield database_1.default.query('SELECT COUNT(*) AS cnt FROM homes WHERE user = ?', [userId]);
            if (cnt > 0) {
                // 2) If there are any listings, block deletion
                return res.status(400).json({
                    success: false,
                    message: 'Cannot delete user with active listings. Remove their listings first.'
                });
            }
            // 3) Delete all likes and comments by this user to avoid dangling references
            yield database_1.default.query('DELETE FROM likes WHERE user_id = ?', [userId]);
            yield database_1.default.query('DELETE FROM comments WHERE user_id = ?', [userId]);
            // 4) Finally, delete the user record
            yield database_1.default.query('DELETE FROM users WHERE id = ?', [userId]);
            return res.json({ success: true, message: 'User deleted successfully.' });
        }
        catch (err) {
            console.error('Admin.deleteAnyUser error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    });
}
exports.default = handleDeleteAnyUser;
