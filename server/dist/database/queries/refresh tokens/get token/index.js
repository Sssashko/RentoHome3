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
// Retrieve the refresh token for a specific user (if any)
const database_1 = __importDefault(require("../../../../database"));
const getRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Query for token and user_id in refreshTokens table
    const sql = `
    SELECT token, user_id
    FROM refreshTokens
    WHERE user_id = ?
  `;
    const [rows] = yield database_1.default.query(sql, [userId]);
    if (rows.length) {
        console.log('Refresh Token found:', rows[0]); // debug: show fetched row
        return rows[0].token; // return the token string
    }
    else {
        console.log('No Refresh Token found'); // debug: no token present
        return null; // indicate absence
    }
});
exports.default = getRefreshToken;
