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
const delete_comment_1 = __importDefault(require("../../../../database/queries/comments/delete comment"));
const images_1 = require("../../../../database/queries/images");
const helpers_1 = require("../../../../helpers");
const handleDeleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // parse (analizēt) comment ID from URL
        const commentId = Number(req.params.commentId);
        // get any images linked to this comment
        const images = yield (0, images_1.fetchRelatedImages)(commentId);
        // remove DB records for those images
        yield (0, images_1.deleteRelatedImages)(commentId);
        // delete the comment itself
        yield (0, delete_comment_1.default)(commentId);
        // delete physical image files if any URLs returned
        if (images === null || images === void 0 ? void 0 : images.length) {
            yield (0, helpers_1.deleteFiles)(...images);
        }
        res.status(200).json('Comment has been deleted');
    }
    catch (error) {
        console.error('Error while deleting comment', error);
        res.status(500).json('Error while deleting comment');
    }
});
exports.default = handleDeleteComment;
