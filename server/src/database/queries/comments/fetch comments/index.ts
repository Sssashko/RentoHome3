import pool from 'database';

export async function fetchCommentsByHomeId(homeId: number) {
  const sql = `
    SELECT *
    FROM comments
    WHERE home_id = ?
    ORDER BY created_at DESC
  `;
  const [rows] = await pool.query(sql, [homeId]);
  return rows; // Массив комментариев для конкретного homeId
}

export default fetchCommentsByHomeId;
