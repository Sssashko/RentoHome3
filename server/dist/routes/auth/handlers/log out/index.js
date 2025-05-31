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
Object.defineProperty(exports, "__esModule", { value: true });
const refresh_tokens_1 = require("../../../../database/queries/refresh tokens");
const handleLogOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        // clear the access token cookie
        res.clearCookie('accessToken');
        // remove refresh token from database
        yield (0, refresh_tokens_1.deleteRefreshToken)(userId);
        res.json();
    }
    catch (error) {
        console.error('Error while logging out', error);
        res.status(500).json('Error while logging out');
    }
});
exports.default = handleLogOut;
