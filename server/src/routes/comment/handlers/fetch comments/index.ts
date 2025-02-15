import pool from 'database';

/**
 * Возвращает все комментарии к конкретному дому
 * @param homeId - ID дома
 */
export async function fetchCommentsByHomeId(homeId: number) {
  const sql = `
    SELECT *
    FROM comments
    WHERE home_id = ?
    ORDER BY created_at DESC
  `;
  const [rows] = await pool.query(sql, [homeId]);
  return rows; // массив комментариев
}

export default fetchCommentsByHomeId