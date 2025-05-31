"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const send_email_1 = __importDefault(require("./handlers/send email"));
const emailRouter = (0, express_1.Router)();
// route to trigger sending an email
emailRouter.post('/send', send_email_1.default);
exports.default = emailRouter;
