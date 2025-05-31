"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = __importDefault(require("../../middleware/authenticate")); // verifies auth token
const admin_1 = __importDefault(require("../../middleware/admin")); // checks admin privileges
const handlers_1 = require("./handlers");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: './uploads/' });
const adminRouter = (0, express_1.Router)();
// Apply auth and admin checks to all admin routes
adminRouter.use(authenticate_1.default, admin_1.default);
// User routes
adminRouter.get('/users', handlers_1.handleListAllUsers);
adminRouter.patch('/users/:id', authenticate_1.default, admin_1.default, upload.single('avatar'), handlers_1.handleUpdateAnyUser);
adminRouter.delete('/users/:id', handlers_1.handleDeleteAnyUser);
// Home routes
adminRouter.get('/homes', handlers_1.handleListAllHomes);
adminRouter.delete('/homes/:id', handlers_1.handleDeleteAnyHome);
exports.default = adminRouter;
