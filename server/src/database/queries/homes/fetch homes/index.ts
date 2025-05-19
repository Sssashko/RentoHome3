import pool from 'database'
import { RowDataPacket } from 'mysql2'
import { Home } from 'types'

/**
 * Fetch all homes with their associated owner info and images.
 *
 * - Joins the `users` table to embed (iegultu) user data as a JSON object (`user`)
 * - Uses a subquery to fetch and sort related images by `position`
 * - Images are wrapped in a nested `JSON_ARRAYAGG` to group them per home
 * 
 * @returns Array of Home objects with embedded `user` and `images` fields
 */
const fetchHomes = async (): Promise<Home[]> => {
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
  `

  // Execute query and cast results to Home[]
  const [rows] = await pool.query<RowDataPacket[]>(sql)

  return rows.length ? (rows as Home[]) : []
}

export default fetchHomes
