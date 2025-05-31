"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const create_comment_1 = __importDefault(require("./handlers/create comment"));
const delete_comment_1 = __importDefault(require("./handlers/delete comment"));
const fetch_comments_1 = require("./handlers/fetch comments");
const commentsRouter = (0, express_1.Router)();
// GET /:homeId  → list comments for given home
commentsRouter.get('/:homeId', fetch_comments_1.fetchCommentsByHomeId);
// POST /:homeId → add new comment (requires auth)
commentsRouter.post('/:homeId', middleware_1.authenticate, create_comment_1.default);
// DELETE /:commentId → delete comment by ID (requires auth)
commentsRouter.delete('/:commentId', middleware_1.authenticate, delete_comment_1.default);
exports.default = commentsRouter;
