"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = require("path");
const middleware_1 = require("./middleware");
const authenticate_1 = __importDefault(require("./middleware/authenticate"));
const admin_1 = __importDefault(require("./middleware/admin"));
const routes_1 = require("./routes");
const config_1 = require("./config");
const app = (0, express_1.default)();
// --- Middlewares ---
// Parse JSON request bodies
app.use((0, express_1.json)());
app.use(express_1.default.urlencoded({
    extended: true,
}));
// Parse cookies from incoming requests
app.use((0, cookie_parser_1.default)());
// Enable CORS for our frontend origin and allow credentials
app.use((0, cors_1.default)({ origin: config_1.CLIENT_URL, credentials: true }));
// Initialize passport for OAuth flows (if used)
app.use(middleware_1.passport.initialize());
// --- Static file serving ---
// Serve uploaded images from server/images under the /images URL path
app.use('/images', express_1.default.static((0, path_1.join)(__dirname, '..', 'images')));
// Also serve any files placed in public/images under /public/images
app.use('/public/images', express_1.default.static((0, path_1.join)(__dirname, '..', 'public', 'images')));
// --- Routes ---
// Health check endpoint
app.use('/health', routes_1.healthRouter);
// CRUD for homes, plus comments & likes
app.use('/homes', routes_1.homesRouter);
// Authentication routes (login, signup, etc)
app.use('/auth', routes_1.authRouter);
// User profile management
app.use('/users', routes_1.usersRouter);
// Email sending endpoint (e.g. contact form)
app.use('/email', routes_1.emailRouter);
// Comment CRUD routes
app.use('/comments', routes_1.commentRouter);
app.use('/api/admin', authenticate_1.default, admin_1.default, routes_1.adminRouter);
// Catch-all 404 for any unhandled routes
app.use('*', (_req, res) => {
    res.status(404).json({ message: 'Not found' });
});
// Optional root endpoint
app.use('/', (_req, res) => {
    res.send('<h1>Hello, world!</h1>');
});
// Start HTTP server
app.listen(config_1.PORT, () => {
    console.log(`Server is listening on port ${config_1.PORT}`);
});
