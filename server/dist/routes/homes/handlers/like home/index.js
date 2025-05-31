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
const like_home_1 = __importDefault(require("../../../../database/queries/homes/like home"));
const handleLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get IDs from URL and authenticated user
        const homeId = Number(req.params.id);
        const userId = req.user.id;
        if (!homeId || !userId) {
            return res.status(400).json({ success: false, message: 'Invalid parameters' });
        }
        // call service to add or remove like and return updated home
        const updatedHome = yield (0, like_home_1.default)(homeId, userId);
        if (!updatedHome) {
            return res.status(404).json({ success: false, message: 'Home not found' });
        }
        // return success with the updated home object
        return res.json({ success: true, home: updatedHome });
    }
    catch (error) {
        console.error('Error while toggling like:', error);
        return res.status(500).json({ success: false, message: 'Error while toggling like' });
    }
});
exports.default = handleLike;
