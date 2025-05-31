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
 * Insert a new user into the `users` table.
 * Supports email/password sign-up.
 * @param userData - user fields, either {username, email, avatar, password} or {username, email, avatar, google_id}
 * @returns the new user's ID
 */
const createUser = ({ username, email, avatar, password, google_id }) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    INSERT INTO users
      (username, email, avatar, password, google_id)
    VALUES (?, ?, ?, ?, ?)
  `;
    // Run query with all five values; one of password/google_id will be undefined
    const [result] = yield database_1.default.query(sql, [
        username,
        email,
        avatar,
        password,
        google_id
    ]);
    return result.insertId;
});
exports.default = createUser;
