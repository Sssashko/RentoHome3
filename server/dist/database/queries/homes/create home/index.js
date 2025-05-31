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
 * Create a new home listing in the database.
 * @param homeData - object containing title, price, square, class, type, country, description
 * @param userId - ID of the user creating the listing
 * @returns the auto-generated ID of the new home record
 */
const createHome = ({ title, price, square, class: homeClass, type, country, description }, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // SQL to insert all required fields into the homes table
    const sql = `
    INSERT INTO homes
      (title, price, square, class, type, country, description, user)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
    // Execute the query with values in correct order
    const [result] = yield database_1.default.query(sql, [
        title,
        price,
        square,
        homeClass,
        type,
        country,
        description,
        userId
    ]);
    // Return the newly created record's ID
    return result.insertId;
});
exports.default = createHome;
