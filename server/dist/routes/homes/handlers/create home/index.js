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
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config");
const homes_1 = require("../../../../database/queries/homes");
const images_1 = require("../../../../database/queries/images");
const handleCreateHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1) get authenticated user from middleware
        const user = req.user;
        // 2) parse (analizē) home data (sent as JSON string in multipart/form-data)
        const home = JSON.parse(req.body.home);
        // 3) insert home record, get its new ID
        const home_id = yield (0, homes_1.createHome)(home, user.id);
        // 4) save uploaded images and collect their metadata
        const uploaded = [];
        if (Array.isArray(req.files)) {
            yield Promise.all(req.files.map((file, index) => __awaiter(void 0, void 0, void 0, function* () {
                const name = file.filename;
                const originalName = file.originalname;
                const url = `${config_1.SERVER_URL}/images/${name}`;
                // insert into images table
                yield (0, images_1.createImage)(name, originalName, url, null, home_id, index);
                uploaded.push({ name, originalName, url });
            })));
        }
        // 5) respond with full home object including new ID, user, images
        const createdHome = Object.assign(Object.assign({}, home), { id: home_id, user, images: uploaded });
        res.status(200).json(createdHome);
    }
    catch (error) {
        console.error('Error while creating home', error);
        res.status(500).json('Error while creating home');
    }
});
exports.default = handleCreateHome;
