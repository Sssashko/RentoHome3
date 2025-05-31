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
const get_token_1 = __importDefault(require("../../../../database/queries/refresh tokens/get token"));
const jwt_1 = require("../../../../helpers/jwt");
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        // fetch stored refresh token
        const stored = yield (0, get_token_1.default)(userId);
        if (!stored) {
            // no token found → unauthorized
            return res.status(401).json('No refresh token found');
        }
        // verify and decode refresh token
        const user = (0, jwt_1.verifyToken)(stored);
        // issue new access token
        const accessToken = (0, jwt_1.createAccessToken)(user);
        res.cookie('accessToken', accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true
        });
        res.json();
    }
    catch (error) {
        console.error('Error while refreshing tokens', error);
        res.status(401).json('Error while refreshing tokens');
    }
});
exports.default = handleRefreshToken;
