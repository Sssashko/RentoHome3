// Delete all stored refresh tokens for a given user
import pool from 'database'

const deleteRefreshToken = async (userId: number) => {
  // Remove any existing refresh token tied to this user ID
  const sql = `
    DELETE FROM refreshTokens
    WHERE user = ?
  `
  await pool.query(sql, [userId])
}

export default deleteRefreshToken
