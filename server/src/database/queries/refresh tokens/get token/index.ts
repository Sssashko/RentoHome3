// Retrieve the refresh token for a specific user (if any)
import pool from 'database'
import { RowDataPacket } from 'mysql2'

const getRefreshToken = async (userId: number): Promise<string | null> => {
  // Query for token and user_id in refreshTokens table
  const sql = `
    SELECT token, user_id
    FROM refreshTokens
    WHERE user_id = ?
  `
  const [rows] = await pool.query<RowDataPacket[]>(sql, [userId])

  if (rows.length) {
    console.log('Refresh Token found:', rows[0]) // debug: show fetched row
    return rows[0].token                      // return the token string
  } else {
    console.log('No Refresh Token found')      // debug: no token present
    return null                                // indicate absence
  }
}

export default getRefreshToken
