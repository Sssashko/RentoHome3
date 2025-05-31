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
const config_1 = require("../../../../config");
const images_1 = require("../../../../database/queries/images");
const homes_1 = require("../../../../database/queries/homes");
const delete_image_1 = __importDefault(require("../../../../database/queries/images/delete image"));
const helpers_1 = require("../../../../helpers");
const handleUpdateHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // debug incoming data
        console.log('Updating home:', req.body.home, req.body.removedImages, req.files);
        const home = JSON.parse(req.body.home);
        // 1) save new image files and add to home.images
        if (Array.isArray(req.files)) {
            for (const file of req.files) {
                const name = file.filename;
                const originalName = file.originalname;
                const url = `${config_1.SERVER_URL}/images/${name}`;
                const index = ((_a = home.images) === null || _a === void 0 ? void 0 : _a.length) || 0;
                yield (0, images_1.createImage)(name, originalName, url, null, home.id, index);
                home.images = home.images || [];
                home.images.push({ name, originalName, url });
            }
        }
        // 2) delete images the client requested to remove
        const removed = JSON.parse((_b = req.body.removedImages) !== null && _b !== void 0 ? _b : '[]');
        for (const url of removed) {
            const [result] = yield (0, delete_image_1.default)(url);
            if (result.affectedRows === 0) {
                console.warn('No DB row for', url);
            }
            const fileName = url.split('/').pop();
            if (fileName) {
                try {
                    yield (0, helpers_1.deleteFiles)(fileName); // remove actual file
                }
                catch (err) {
                    if (err.code !== 'ENOENT')
                        throw err;
                    console.warn('File already deleted', fileName);
                }
            }
        }
        // remove deleted URLs from home.images before updating FK constraints (ierobežojumi)
        home.images = home.images.filter(img => !removed.includes(img.url));
        // 3) update home record itself
        yield (0, homes_1.updateHome)(home);
        res.status(200).json(home);
    }
    catch (error) {
        console.error('Error while updating home', error);
        res.status(500).json({ success: false, message: 'Error while updating home' });
    }
});
exports.default = handleUpdateHome;
