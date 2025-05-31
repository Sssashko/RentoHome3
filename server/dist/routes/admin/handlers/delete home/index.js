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
const images_1 = require("../../../../database/queries/images");
const database_1 = __importDefault(require("../../../../database"));
/**
 * Remove a home and all its associated images.
 */
function handleDeleteAnyHome(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            // Get all image URLs for this home
            const urls = yield (0, images_1.fetchRelatedImages)(Number(id));
            // Delete each file in parallel
            yield Promise.all(urls.map(images_1.deleteImage));
            // Remove image entries from the database
            yield (0, images_1.deleteRelatedImages)(Number(id));
            // Delete the home record
            yield database_1.default.query('DELETE FROM homes WHERE id = ?', [id]);
            return res.status(200).json({ message: 'Home and images deleted' });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to delete home' });
        }
    });
}
exports.default = handleDeleteAnyHome;
