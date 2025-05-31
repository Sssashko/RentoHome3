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
const database_1 = __importDefault(require("../../../../database"));
/**
 * Toggle like/unlike for a user on a home.
 * Uses transaction to:
 * 1. Lock any existing like row
 * 2. Insert or delete like
 * 3. Increment or decrement homes.likes count safely
 * @param homeId - ID of the home being liked/unliked
 * @param userId - ID of the user performing the action
 * @returns updated Home record (with new likes count) or null if not found
 */
const homeLike = (homeId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.getConnection();
    try {
        yield connection.beginTransaction();
        // Check if this user already liked the home
        const [existing] = yield connection.query('SELECT * FROM likes WHERE home_id = ? AND user_id = ? FOR UPDATE', [homeId, userId]);
        if (existing.length) {
            // User had liked: remove like row and decrement count (min 0)
            yield connection.query('DELETE FROM likes WHERE home_id = ? AND user_id = ?', [homeId, userId]);
            yield connection.query('UPDATE homes SET likes = GREATEST(likes - 1, 0) WHERE id = ?', [homeId]);
        }
        else {
            // No existing like: insert new and increment count
            yield connection.query('INSERT INTO likes (home_id, user_id) VALUES (?, ?)', [homeId, userId]);
            yield connection.query('UPDATE homes SET likes = likes + 1 WHERE id = ?', [homeId]);
        }
        yield connection.commit();
        // Fetch and return the updated home record
        const [updated] = yield database_1.default.query('SELECT * FROM homes WHERE id = ? LIMIT 1', [homeId]);
        return updated.length ? updated[0] : null;
    }
    catch (err) {
        // Roll back on error to avoid partial updates
        yield connection.rollback();
        throw err;
    }
    finally {
        connection.release();
    }
});
exports.default = homeLike;
