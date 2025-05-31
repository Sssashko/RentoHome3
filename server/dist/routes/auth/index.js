"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helpers_1 = require("../../helpers");
const handlers_1 = require("./handlers");
const authRouter = (0, express_1.Router)();
// Check if the user is already authenticated (returns user info or null)
authRouter.get('/', handlers_1.handleCheckAuth);
// Log in with email+password, set accessToken cookie, store refresh token
authRouter.post('/login', handlers_1.handleLogIn);
// Sign up with optional avatar upload, hash password, create user, issue tokens
authRouter.post('/signup', helpers_1.upload.single('avatar'), handlers_1.handleSignUp);
// Log out: clear accessToken cookie and delete refresh token from DB
authRouter.post('/logout', handlers_1.handleLogOut);
// Issue a new short-lived access token using stored refresh token
authRouter.post('/refreshtoken', handlers_1.handleRefreshToken);
exports.default = authRouter;
