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
 * Handler to fetch all likes for a specific home.
 * @param req  - Express Request object (expects `req.params.id` as home ID)
 * @param res  - Express Response object (used to return JSON with likes)
 */
const handleFetchLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extract home ID from URL params and convert to number
        const homeId = Number(req.params.id);
        const sql = `
      SELECT *
      FROM likes
      WHERE home_id = ?
    `;
        // execute query, rows will be array of like records
        const [rows] = yield database_1.default.query(sql, [homeId]);
        // send back success flag and the likes array
        return res.json({ success: true, likes: rows });
    }
    catch (error) {
        console.error('Error fetching likes:', error);
        // on error, respond with HTTP 500 and error message
        return res.status(500).json({ success: false, message: 'Error fetching likes' });
    }
});
exports.default = handleFetchLikes;
