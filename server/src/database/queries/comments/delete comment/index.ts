import pool from 'database'

/**
 * Delete a comment by its ID.
 * @param commentId - ID of the comment to remove
 */
const deleteComment = async (commentId: number) => {
  const sql = `
    DELETE FROM comments
    WHERE id = ?
  `
  await pool.query(sql, [commentId])  // execute delete query
}

export default deleteComment
