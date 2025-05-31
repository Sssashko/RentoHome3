"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthRouter = (0, express_1.Router)();
// Simple health-check endpoint.
// Responds with 201 if the server is up and running.
healthRouter.get('/', (_req, res) => {
    res.status(201).json('Server is working');
});
exports.default = healthRouter;
