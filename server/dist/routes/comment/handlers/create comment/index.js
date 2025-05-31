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
const create_comment_1 = __importDefault(require("../../../../database/queries/comments/create comment"));
const handleCreateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get authenticated user from request (set by authenticate middleware)
        const user = req.user;
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return res.status(401).json({ success: false, message: 'Unauthorized (no user)' });
        }
        // read home_id and text from request body
        const { home_id, text } = req.body;
        if (!home_id || !text) {
            return res.status(400).json({ success: false, message: 'Invalid comment data' });
        }
        // insert comment into DB and get new comment ID
        const commentId = yield (0, create_comment_1.default)({ home_id, text }, user.id);
        // build comment object to return
        const createdComment = {
            id: commentId,
            home_id,
            text,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            },
            created_at: new Date() // timestamp for client
        };
        return res.status(200).json({ success: true, comment: createdComment });
    }
    catch (error) {
        console.error('Error while creating comment', error);
        return res.status(500).json({ success: false, message: 'Error while creating comment' });
    }
});
exports.default = handleCreateComment;
