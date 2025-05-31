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
 * Update an existing home listing.
 * @param home - full Home object with updated fields
 */
const updateHome = ({ id, title, price, square, class: homeClass, type, country, description }) => __awaiter(void 0, void 0, void 0, function* () {
    // Update only the specified columns for the given home ID
    const sql = `
    UPDATE homes
    SET
      title = ?,
      price = ?,
      square = ?,
      class = ?,
      type = ?,
      country = ?,
      description = ?
    WHERE id = ?
  `;
    yield database_1.default.query(sql, [
        title,
        price,
        square,
        homeClass,
        type,
        country,
        description,
        id
    ]);
});
exports.default = updateHome;
