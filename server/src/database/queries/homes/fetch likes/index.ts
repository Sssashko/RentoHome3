import pool from 'database'

/**
 * Retrieve all like records for a specific home.
 * @param homeId - ID of the home to get likes for
 * @returns array of like rows (each with home_id and user_id)
 */
const fetchLikesByHomeId = async (homeId: number) => {
  const sql = `
    SELECT *
    FROM likes
    WHERE home_id = ?
  `
  const [rows] = await pool.query(sql, [homeId])
  return rows
}

export default fetchLikesByHomeId
