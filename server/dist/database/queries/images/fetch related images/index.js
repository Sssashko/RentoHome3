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
 * Fetch image URLs for a specific home ID from the images table.
 * Returns an array of URL strings (empty if none found).
 */
function fetchRelatedImages(homeId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Query the database for image records matching the homeId
        const [rows] = yield database_1.default.query('SELECT url FROM images WHERE home_id = ?', [homeId]);
        // Extract and return the url field from each row
        return rows.map((r) => r.url);
    });
}
exports.default = fetchRelatedImages;
