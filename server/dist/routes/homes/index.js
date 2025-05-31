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
const express_1 = require("express");
const helpers_1 = require("../../helpers");
const middleware_1 = require("../../middleware");
const handlers_1 = require("./handlers");
const create_comment_1 = __importDefault(require("../../database/queries/comments/create comment"));
const fetch_comments_1 = require("../../database/queries/comments/fetch comments");
const fetch_likes_1 = __importDefault(require("../../database/queries/homes/fetch likes"));
const homesRouter = (0, express_1.Router)();
// GET /homes – return list of all homes
homesRouter.get('/', handlers_1.handleFetchHomes);
// POST /homes – create a new home (requires auth and image upload)
homesRouter.post('/', middleware_1.authenticate, // check user is logged in
helpers_1.upload.array('image'), // accept multiple files under field "image"
handlers_1.handleCreateHome);
// PATCH /homes – update an existing home (requires auth and image upload)
homesRouter.patch('/', middleware_1.authenticate, helpers_1.upload.array('image'), handlers_1.handleUpdateHome);
// DELETE /homes/:id – delete a home by its ID (requires auth)
homesRouter.delete('/:id', middleware_1.authenticate, handlers_1.handleDeleteHome);
// PATCH /homes/:id/like – toggle like/unlike for a home (requires auth)
homesRouter.patch('/:id/like', middleware_1.authenticate, handlers_1.handleLike);
// GET /homes/:id/likes – fetch all likes for a specific home
homesRouter.get('/:id/likes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const homeId = Number(req.params.id); // parse home ID
        const likes = yield (0, fetch_likes_1.default)(homeId); // get likes array
        res.json({ success: true, likes });
    }
    catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ success: false, message: 'Error fetching likes' });
    }
}));
// GET /homes/:id/comments – fetch all comments for a specific home
homesRouter.get('/:id/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const homeId = Number(req.params.id); // parse home ID
        const comments = yield (0, fetch_comments_1.fetchCommentsByHomeId)(homeId);
        res.json({ success: true, comments });
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ success: false, message: 'Error fetching comments' });
    }
}));
// POST /homes/:id/comments – add a comment to a home
homesRouter.post('/:id/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const homeId = Number(req.params.id); // parse home ID
        const { text } = req.body; // comment text
        const userId = 41; // placeholder or use req.user?.id if auth applied
        const newCommentId = yield (0, create_comment_1.default)({ home_id: homeId, text }, userId);
        // return the newly created comment object
        res.json({
            success: true,
            comment: {
                id: newCommentId,
                home_id: homeId,
                user_id: userId,
                text,
                created_at: new Date()
            }
        });
    }
    catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ success: false, message: 'Error creating comment' });
    }
}));
exports.default = homesRouter;
