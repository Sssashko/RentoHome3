// Store a new refresh token for a user
import pool from 'database'

const storeRefreshToken = async (token: string, userId: number) => {
  // Insert a new token record tied to the user ID
  const sql = `
    INSERT INTO refreshTokens (token, user)
    VALUES (?, ?)
  `
  await pool.query(sql, [token, userId])
}

export default storeRefreshToken
