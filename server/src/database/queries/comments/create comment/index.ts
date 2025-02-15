import pool from 'database';
import { ResultSetHeader } from 'mysql2/promise';

interface CommentData {
  home_id: number;
  text: string;
}

/**
 * Сохраняет комментарий в таблицу `comments`.
 * @param commentData - { home_id, text }
 * @param userId - id пользователя (если нужно)
 * @returns id вставленного комментария
 */
const createComment = async (commentData: CommentData, userId: number) => {
  const { home_id, text } = commentData;

  const sql = `
    INSERT INTO comments (home_id, user_id, text)
    VALUES (?, ?, ?)
  `;
  const [result] = await pool.query<ResultSetHeader>(sql, [home_id, userId, text]);

  return result.insertId; // id нового комментария
};

export default createComment;
