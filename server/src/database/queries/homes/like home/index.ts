import pool from 'database'
import { RowDataPacket } from 'mysql2'
import { Home } from 'types'

/**
 * Toggle like/unlike for a user on a home.
 * Uses transaction to:
 * 1. Lock any existing like row
 * 2. Insert or delete like
 * 3. Increment or decrement homes.likes count safely
 * @param homeId - ID of the home being liked/unliked
 * @param userId - ID of the user performing the action
 * @returns updated Home record (with new likes count) or null if not found
 */
const homeLike = async (homeId: number, userId: number): Promise<Home | null> => {
  const connection = await pool.getConnection()

  try {
    await connection.beginTransaction()

    // Check if this user already liked the home
    const [existing]: [RowDataPacket[], any] = await connection.query(
      'SELECT * FROM likes WHERE home_id = ? AND user_id = ? FOR UPDATE',
      [homeId, userId]
    )

    if (existing.length) {
      // User had liked: remove like row and decrement count (min 0)
      await connection.query(
        'DELETE FROM likes WHERE home_id = ? AND user_id = ?',
        [homeId, userId]
      )
      await connection.query(
        'UPDATE homes SET likes = GREATEST(likes - 1, 0) WHERE id = ?',
        [homeId]
      )
    } else {
      // No existing like: insert new and increment count
      await connection.query(
        'INSERT INTO likes (home_id, user_id) VALUES (?, ?)',
        [homeId, userId]
      )
      await connection.query(
        'UPDATE homes SET likes = likes + 1 WHERE id = ?',
        [homeId]
      )
    }

    await connection.commit()

    // Fetch and return the updated home record
    const [updated]: [RowDataPacket[], any] = await pool.query(
      'SELECT * FROM homes WHERE id = ? LIMIT 1',
      [homeId]
    )
    return updated.length ? (updated[0] as Home) : null

  } catch (err) {
    // Roll back on error to avoid partial updates
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

export default homeLike
