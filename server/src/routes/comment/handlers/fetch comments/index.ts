import pool from 'database'

/**
 * Fetch all comments for a specific home, newest first.
 * @param homeId - ID of the home to get comments for
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
  return rows
}

export default fetchCommentsByHomeId
