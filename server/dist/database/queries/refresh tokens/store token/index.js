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
// Store a new refresh token for a user
const database_1 = __importDefault(require("../../../../database"));
const storeRefreshToken = (token, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Insert a new token record tied to the user ID
    const sql = `
    INSERT INTO refreshTokens (token, user)
    VALUES (?, ?)
  `;
    yield database_1.default.query(sql, [token, userId]);
});
exports.default = storeRefreshToken;
