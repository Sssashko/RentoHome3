import pool from 'database'
import { RowDataPacket } from 'mysql2'
import { User } from 'types'

/**
 * Look up a user by their email.
 * Trims and lowercases email before querying.
 * @param email - user's email address
 * @returns user object (with password) or null if not found
 */
const fetchUserByEmail = async (email: string): Promise<(User & { password: string }) | null> => {
  const normalizedEmail = email.trim().toLowerCase()
  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
  `
  const [rows] = await pool.query<RowDataPacket[]>(sql, [normalizedEmail])

  console.log('DB Query Result:', rows[0])  // debug: first row or undefined

  if (rows.length) {
    return rows[0] as User & { password: string }
  } else {
    return null
  }
}

export default fetchUserByEmail
