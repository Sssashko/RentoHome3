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
 * Save an image record linked to a home or user.
 *
 * @param name - Internal filename used for storage
 * @param originalName - Original file name as uploaded by the user
 * @param url - Full public URL to access the image
 * @param userId - Optional user ID if the image belongs to a user (e.g. avatar)
 * @param homeId - Optional home ID if the image is associated with a home listing
 * @param position - Optional image order index (used to control display order)
 */
const createImage = (name, originalName, url, userId = null, homeId = null, position = null) => __awaiter(void 0, void 0, void 0, function* () {
    // SQL query to insert a new image record into the 'images' table
    const sql = `
    INSERT INTO images (name, originalName, url, user_id, home_id, position)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    // Execute the query with the provided values.
    // If position is not provided, it defaults to 0.
    yield database_1.default.query(sql, [name, originalName, url, null, homeId, position !== null && position !== void 0 ? position : 0]);
});
exports.default = createImage;
