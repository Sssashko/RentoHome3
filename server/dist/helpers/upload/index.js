"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const uuid_1 = require("uuid");
// Only allow these image file extensions
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
// Configure disk storage for uploaded files
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'images/'); // save into the local images/ folder
    },
    filename: (_req, file, cb) => {
        const extension = (0, path_1.extname)(file.originalname).toLowerCase();
        // Reject disallowed file types
        if (!allowedExtensions.includes(extension)) {
            return cb(new Error('Invalid file type'), '');
        }
        // Use a UUID to avoid name collisions, keep original extension
        cb(null, (0, uuid_1.v4)() + extension);
    }
});
// Create the multer middleware with 5MB file size limit
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});
exports.default = upload;
