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
const users_1 = require("../../../../database/queries/users");
const images_1 = require("../../../../database/queries/images");
const helpers_1 = require("../../../../helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleUpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extract incoming user fields from request body
        const user = req.body;
        // prepare an object with fields we always update
        const updates = {
            username: user.username,
            email: user.email
        };
        // if client sent a new password, hash it before saving
        if (user.password) {
            updates.password = yield bcrypt_1.default.hash(user.password, 10);
        }
        // if a new avatar image was uploaded, handle file save and cleanup
        if (req.file) {
            const file = req.file;
            const fileName = file.filename;
            const url = `${config_1.SERVER_URL}/images/${fileName}`;
            updates.avatar = url;
            // add new avatar record in DB
            yield (0, images_1.createImage)(fileName, file.originalname, url, user.id);
            // remove old avatar record and file if it exists
            if (user.avatar) {
                yield (0, images_1.deleteImage)(user.avatar);
                yield (0, helpers_1.deleteFiles)(user.avatar);
            }
            // include the new avatar URL in update payload
            updates.avatar = url;
        }
        // perform the database update for this user
        yield (0, users_1.updateUser)(user.id, updates);
        // respond with the merged original and updated fields
        res.status(200).json(Object.assign(Object.assign({}, user), updates));
    }
    catch (error) {
        // on error, send a generic 500 response
        res.status(500).json('An error occurred while updating user');
    }
});
exports.default = handleUpdateUser;
