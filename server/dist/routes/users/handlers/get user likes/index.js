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
const handleGetUserLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // parse (analizēt) user ID from URL params
        const userId = Number(req.params.id);
        // select only home_id values where this user has liked
        const sql = 'SELECT home_id FROM likes WHERE user_id = ?';
        const [rows] = yield database_1.default.query(sql, [userId]);
        // extract array of home IDs
        const likedHomeIds = Array.isArray(rows)
            ? rows.map((row) => row.home_id)
            : [];
        // return the list of liked home IDs
        return res.json({ success: true, likes: likedHomeIds });
    }
    catch (error) {
        console.error('Error fetching user likes:', error);
        // on error, send 500
        return res.status(500).json({ success: false, message: 'Error fetching user likes' });
    }
});
exports.default = handleGetUserLikes;
