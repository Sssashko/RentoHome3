"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRelatedImages = exports.deleteRelatedImages = exports.deleteImage = exports.createImage = void 0;
var create_image_1 = require("./create image");
Object.defineProperty(exports, "createImage", { enumerable: true, get: function () { return __importDefault(create_image_1).default; } });
var delete_image_1 = require("./delete image");
Object.defineProperty(exports, "deleteImage", { enumerable: true, get: function () { return __importDefault(delete_image_1).default; } });
var delete_related_images_1 = require("./delete related images");
Object.defineProperty(exports, "deleteRelatedImages", { enumerable: true, get: function () { return __importDefault(delete_related_images_1).default; } });
var fetch_related_images_1 = require("./fetch related images");
Object.defineProperty(exports, "fetchRelatedImages", { enumerable: true, get: function () { return __importDefault(fetch_related_images_1).default; } });
