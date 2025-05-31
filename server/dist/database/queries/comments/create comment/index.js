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
 * Insert a new comment into `comments` table.
 * @param commentData - contains home_id and text
 * @param userId - ID of the commenting user
 * @returns insertId of the new comment
 */
const createComment = (commentData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { home_id, text } = commentData;
    // SQL insert; relies on valid home_id and userId (FK constraints)
    const sql = `
    INSERT INTO comments (home_id, user_id, text)
    VALUES (?, ?, ?)
  `;
    const [result] = yield database_1.default.query(sql, [
        home_id,
        userId,
        text
    ]);
    return result.insertId; // return new comment ID
});
exports.default = createComment;
