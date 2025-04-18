import pool from 'database'

const deleteComment = async (commentId: number) => {
  const sql = `
    DELETE FROM comments
    WHERE id = ?
  `
  await pool.query(sql, [commentId])
}

export default deleteComment
