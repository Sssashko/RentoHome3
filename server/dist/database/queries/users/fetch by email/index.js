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
 * Look up a user by their email.
 * Trims and lowercases email before querying.
 * @param email - user's email address
 * @returns user object (with password) or null if not found
 */
const fetchUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const normalizedEmail = email.trim().toLowerCase();
    const sql = `
    SELECT *
    FROM users
    WHERE email = ?
  `;
    const [rows] = yield database_1.default.query(sql, [normalizedEmail]);
    console.log('DB Query Result:', rows[0]); // debug: first row or undefined
    if (rows.length) {
        return rows[0];
    }
    else {
        return null;
    }
});
exports.default = fetchUserByEmail;
