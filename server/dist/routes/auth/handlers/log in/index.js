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
const bcrypt_1 = require("bcrypt");
const refresh_tokens_1 = require("../../../../database/queries/refresh tokens");
const users_1 = require("../../../../database/queries/users");
const jwt_1 = require("../../../../helpers/jwt");
const handleLogIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, users_1.fetchUserByEmail)(email);
        // check user exists and password matches
        if (user && (yield (0, bcrypt_1.compare)(password, user.password))) {
            const accessToken = (0, jwt_1.createAccessToken)(user);
            const refreshToken = (0, jwt_1.createRefreshToken)(user);
            // set secure, httpOnly cookie with access token
            res.cookie('accessToken', accessToken, {
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
                httpOnly: true
            });
            // save refresh token in database
            yield (0, refresh_tokens_1.storeRefreshToken)(refreshToken, user.id);
            return res.status(200).json(user);
        }
        // wrong email or password
        res.status(401).json('Wrong credentials!');
    }
    catch (error) {
        console.error('Error while logging in', error);
        res.status(500).json('Error while logging in');
    }
});
exports.default = handleLogIn;
