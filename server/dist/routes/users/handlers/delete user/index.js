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
const delete_token_1 = __importDefault(require("../../../../database/queries/refresh tokens/delete token"));
const delete_user_1 = __importDefault(require("../../../../database/queries/users/delete user"));
const handleDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // parse (analizēt) and validate user ID from URL
        const userId = Number(req.params.id);
        if (!userId || isNaN(userId)) {
            return res.status(400).json('Invalid user ID');
        }
        // first remove any stored refresh tokens for this user
        yield (0, delete_token_1.default)(userId);
        // then delete the user record itself
        yield (0, delete_user_1.default)(userId);
        // respond that deletion (dzēšana) succeeded
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        // on error, send 500
        return res.status(500).json({ message: 'Failed to delete user' });
    }
});
exports.default = handleDeleteUser;
