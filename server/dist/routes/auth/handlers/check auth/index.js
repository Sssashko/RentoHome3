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
const helpers_1 = require("../../../../helpers");
const handleCheckAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['accessToken'];
        if (!token) {
            // no token → not authenticated
            return res.json(null);
        }
        // decode and verify JWT, returns user payload
        const user = (0, helpers_1.verifyToken)(token);
        res.json(user);
    }
    catch (_a) {
        // invalid or expired token
        res.json(null);
    }
});
exports.default = handleCheckAuth;
