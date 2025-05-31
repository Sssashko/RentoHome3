"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helpers_1 = require("../../helpers");
const authenticate_1 = __importDefault(require("../../middleware/authenticate"));
const handlers_1 = require("./handlers");
const usersRouter = (0, express_1.Router)();
// update profile (requires auth, file upload)
usersRouter.patch('/update', authenticate_1.default, // ensure user is logged in
helpers_1.upload.single('avatar'), // accept single file under field "avatar"
(req, res, next) => {
    next();
}, handlers_1.handleUpdateUser);
// delete a user account (requires auth)
usersRouter.delete('/:id', authenticate_1.default, handlers_1.handleDeleteUser);
// get list of homes liked by user (requires auth)
usersRouter.get('/:id/likes', authenticate_1.default, handlers_1.handleGetUserLikes);
exports.default = usersRouter;
