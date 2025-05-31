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
const images_1 = require("../../../../database/queries/images");
const homes_1 = require("../../../../database/queries/homes");
const helpers_1 = require("../../../../helpers");
const handleDeleteHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        // 1) remove all comments and likes for this home
        yield database_1.default.query('DELETE FROM comments WHERE home_id = ?', [id]);
        yield database_1.default.query('DELETE FROM likes WHERE home_id = ?', [id]);
        // 2) fetch and delete related image records & files
        const images = (yield (0, images_1.fetchRelatedImages)(id)) || []; // array of URLs
        yield (0, images_1.deleteRelatedImages)(id); // remove DB rows
        if (images.length) {
            // strip URL to filename then delete files from disk
            const fileNames = images.map(url => url.split('/').pop() || '');
            yield (0, helpers_1.deleteFiles)(...fileNames);
        }
        // 3) finally delete the home record
        yield (0, homes_1.deleteHome)(id);
        res.status(200).json({ success: true, message: 'Home deleted' });
    }
    catch (error) {
        console.error('Error while deleting home', error);
        res.status(500).json({ success: false, message: 'Error while deleting home' });
    }
});
exports.default = handleDeleteHome;
