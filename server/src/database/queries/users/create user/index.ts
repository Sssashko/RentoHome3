import pool from 'database'
import { ResultSetHeader } from 'mysql2'

interface WithCredentials {
  username: string
  email: string
  avatar: string
  password: string
  google_id?: never
}

interface WithGoogleId {
  username: string
  email: string
  avatar: string
  password?: never
  google_id: string
}

/**
 * Insert a new user into the `users` table.
 * Supports email/password sign-up.
 * @param userData - user fields, either {username, email, avatar, password} or {username, email, avatar, google_id}
 * @returns the new user's ID
 */
const createUser = async ({
  username,
  email,
  avatar,
  password,
  google_id
}: WithCredentials | WithGoogleId) => {
  const sql = `
    INSERT INTO users
      (username, email, avatar, password, google_id)
    VALUES (?, ?, ?, ?, ?)
  `
  // Run query with all five values; one of password/google_id will be undefined
  const [result] = await pool.query<ResultSetHeader>(sql, [
    username,
    email,
    avatar,
    password,
    google_id
  ])

  return result.insertId
}

export default createUser
