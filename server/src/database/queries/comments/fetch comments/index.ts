import pool from 'database'

/**
 * Retrieve all comments for a given home, newest first.
 * @param homeId - ID of the home to fetch comments for
 * @returns array of comment rows
 */
export async function fetchCommentsByHomeId(homeId: number) {
  const sql = `
    SELECT *
    FROM comments
    WHERE home_id = ?
    ORDER BY created_at DESC
  `
  const [rows] = await pool.query(sql, [homeId])
  return rows   // return list of comments
}

export default fetchCommentsByHomeId
