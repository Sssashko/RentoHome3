"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.fetchComments = exports.createComment = void 0;
var create_comment_1 = require("./create comment");
Object.defineProperty(exports, "createComment", { enumerable: true, get: function () { return __importDefault(create_comment_1).default; } });
var fetch_comments_1 = require("./fetch comments");
Object.defineProperty(exports, "fetchComments", { enumerable: true, get: function () { return __importDefault(fetch_comments_1).default; } });
var delete_comment_1 = require("./delete comment");
Object.defineProperty(exports, "deleteComment", { enumerable: true, get: function () { return __importDefault(delete_comment_1).default; } });
