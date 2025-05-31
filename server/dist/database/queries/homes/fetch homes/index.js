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
 * Fetch all homes with their associated owner info and images.
 *
 * - Joins the `users` table to embed (iegultu) user data as a JSON object (`user`)
 * - Uses a subquery to fetch and sort related images by `position`
 * - Images are wrapped in a nested `JSON_ARRAYAGG` to group them per home
 *
 * @returns Array of Home objects with embedded `user` and `images` fields
 */
const fetchHomes = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    SELECT
      homes.*,
      JSON_OBJECT(
        'id', users.id,
        'username', users.username,
        'email', users.email,
        'avatar', users.avatar
      ) AS user,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'name', sorted.name,
            'originalName', sorted.originalName,
            'url', sorted.url
          )
        )
        FROM (
          SELECT name, originalName, url
          FROM images
          WHERE home_id = homes.id
          ORDER BY position
        ) AS sorted
      ) AS images
    FROM homes
    INNER JOIN users ON homes.user = users.id
  `;
    // Execute query and cast results to Home[]
    const [rows] = yield database_1.default.query(sql);
    return rows.length ? rows : [];
});
exports.default = fetchHomes;
