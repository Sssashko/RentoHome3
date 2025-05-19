import pool from 'database'
import { ResultSetHeader } from 'mysql2/promise'

interface CommentData {
  home_id: number
  text: string
}

/**
 * Insert a new comment into `comments` table.
 * @param commentData - contains home_id and text
 * @param userId - ID of the commenting user
 * @returns insertId of the new comment
 */
const createComment = async (commentData: CommentData, userId: number) => {
  const { home_id, text } = commentData

  // SQL insert; relies on valid home_id and userId (FK constraints)
  const sql = `
    INSERT INTO comments (home_id, user_id, text)
    VALUES (?, ?, ?)
  `
  const [result] = await pool.query<ResultSetHeader>(sql, [
    home_id,
    userId,
    text
  ])

  return result.insertId    // return new comment ID
}

export default createComment
