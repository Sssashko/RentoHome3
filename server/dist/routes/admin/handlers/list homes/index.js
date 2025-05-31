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
 * List all homes along with their owner's username
 */
function handleListAllHomes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1) Fetch homes and join to users table to get owner name
            const [rows] = yield database_1.default.query(`SELECT
         h.id, h.title, h.price, h.square, h.class, h.type,
         h.country, h.description, h.likes,
         u.username AS owner
       FROM homes h
       LEFT JOIN users u ON h.user = u.id`);
            // 2) Return combined data
            return res.json(rows);
        }
        catch (err) {
            console.error('Admin.listHomes error:', err);
            return res.status(500).json({ message: 'Failed to list homes' });
        }
    });
}
exports.default = handleListAllHomes;
