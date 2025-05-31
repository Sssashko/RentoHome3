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
const config_1 = require("../../config");
const promises_1 = require("fs/promises");
const path_1 = require("path");
/**
 * Delete one or more image files based on their public URLs.
 * - Strips the SERVER_URL prefix to get the stored filename
 * - Normalizes the path and prevents path traversal
 * - Removes each file from the local `images/` directory
 */
const deleteFiles = (...urls) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(urls.map((url) => {
        // Remove the base URL so only the filename remains
        const fileName = url.replace(`${config_1.SERVER_URL}/images/`, '');
        // Normalize and strip any "../" to avoid escaping the images folder
        const normalizedFileName = (0, path_1.normalize)(fileName).replace(/^(\.\.(\/|\\|$))*/, '');
        const imagesDir = (0, path_1.join)(__dirname, '..', '..', '..', 'images');
        const filePath = (0, path_1.join)(imagesDir, normalizedFileName);
        // Double-check we stayed inside the images directory
        if (!filePath.startsWith(imagesDir)) {
            throw new Error('Invalid file path');
        }
        // Delete the physical file
        return (0, promises_1.unlink)(filePath);
    }));
});
exports.default = deleteFiles;
