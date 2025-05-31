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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = require("bcrypt");
const database_1 = __importDefault(require("../../../../database"));
const create_user_1 = __importDefault(require("../../../../database/queries/users/create user"));
const create_image_1 = __importDefault(require("../../../../database/queries/images/create image"));
const config_1 = require("../../../../config");
// Default avatar filename when user doesn't upload one
const DEFAULT_AVATAR_FILENAME = 'guest.png';
// Path to public image folder
const IMAGES_DIR = path_1.default.join(__dirname, '..', '..', '..', 'public', 'images');
const handleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Check if a user with this email already exists
        const [existing] = yield database_1.default.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(409).json({ message: 'Email already in use' });
        }
        // Determine avatar filename: uploaded one or fallback to default
        let filename;
        if (req.file) {
            filename = req.file.filename;
        }
        else {
            filename = DEFAULT_AVATAR_FILENAME;
            const defPath = path_1.default.join(IMAGES_DIR, filename);
            if (!fs_1.default.existsSync(defPath)) {
                console.warn(`[SignUp] Default avatar not found at ${defPath}`);
            }
        }
        // Generate full public avatar URL
        const avatarUrl = `${config_1.SERVER_URL}/images/${filename}`;
        // Hash the user's password before saving
        const hashed = yield (0, bcrypt_1.hash)(password, 10);
        // Insert the user into the database
        const userId = yield (0, create_user_1.default)({
            username,
            email,
            avatar: avatarUrl,
            password: hashed
        });
        // If avatar was uploaded manually, save it into images table too
        if (req.file) {
            yield (0, create_image_1.default)(filename, req.file.originalname, avatarUrl, userId);
        }
        // Return user info (excluding password)
        res.status(201).json({
            id: userId,
            username,
            email,
            avatar: avatarUrl
        });
    }
    catch (err) {
        console.error('[handleSignUp] Error:', err);
        res.status(500).json({ message: 'Sign up failed' });
    }
});
exports.default = handleSignUp;
