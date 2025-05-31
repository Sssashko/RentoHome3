"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFetchLikes = exports.handleLike = exports.handleDeleteHome = exports.handleFetchHomes = exports.handleUpdateHome = exports.handleCreateHome = void 0;
var create_home_1 = require("./create home");
Object.defineProperty(exports, "handleCreateHome", { enumerable: true, get: function () { return __importDefault(create_home_1).default; } });
var update_home_1 = require("./update home");
Object.defineProperty(exports, "handleUpdateHome", { enumerable: true, get: function () { return __importDefault(update_home_1).default; } });
var fetch_homes_1 = require("./fetch homes");
Object.defineProperty(exports, "handleFetchHomes", { enumerable: true, get: function () { return __importDefault(fetch_homes_1).default; } });
var delete_home_1 = require("./delete home");
Object.defineProperty(exports, "handleDeleteHome", { enumerable: true, get: function () { return __importDefault(delete_home_1).default; } });
var like_home_1 = require("./like home");
Object.defineProperty(exports, "handleLike", { enumerable: true, get: function () { return __importDefault(like_home_1).default; } });
var fetch_likes_1 = require("./fetch likes");
Object.defineProperty(exports, "handleFetchLikes", { enumerable: true, get: function () { return __importDefault(fetch_likes_1).default; } });
