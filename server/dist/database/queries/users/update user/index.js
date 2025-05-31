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
 * Update one or more fields on an existing user.
 * Builds dynamic SET clause based on provided keys.
 * @param id - ID of the user to update
 * @param updates - partial object with one or more of username, email, password, avatar
 */
const updateUser = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = Object.keys(updates);
    if (fields.length === 0)
        return; // if update id empty, nothing to do
    // build "field = ?" segments and collect values
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => updates[field]).concat(id);
    const sql = `
    UPDATE users
    SET ${setClause}
    WHERE id = ?
  `;
    yield database_1.default.query(sql, values);
});
exports.default = updateUser;
