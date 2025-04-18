// server/src/database/queries/homes/homeLike/index.ts
import pool from 'database';
import { RowDataPacket } from 'mysql2';
import { Home } from 'types';

const homeLike = async (homeId: number, userId: number): Promise<Home | null> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Проверяем, поставлен ли уже лайк данным пользователем для этого дома
    const [rows]: [RowDataPacket[], any] = await connection.query(
      'SELECT * FROM likes WHERE home_id = ? AND user_id = ? FOR UPDATE',
      [homeId, userId]
    );

    if (rows.length > 0) {
      // Если лайк уже есть — удаляем его и уменьшаем число лайков, не допуская отрицательного значения
      await connection.query(
        'DELETE FROM likes WHERE home_id = ? AND user_id = ?',
        [homeId, userId]
      );
      await connection.query(
        'UPDATE homes SET likes = GREATEST(likes - 1, 0) WHERE id = ?',
        [homeId]
      );
    } else {
      // Если лайка нет — вставляем новую запись и увеличиваем число лайков
      await connection.query(
        'INSERT INTO likes (home_id, user_id) VALUES (?, ?)',
        [homeId, userId]
      );
      await connection.query(
        'UPDATE homes SET likes = likes + 1 WHERE id = ?',
        [homeId]
      );
    }

    await connection.commit();

    // Получаем обновлённую запись дома
    const [updatedRows]: [RowDataPacket[], any] = await pool.query(
      'SELECT * FROM homes WHERE id = ? LIMIT 1',
      [homeId]
    );
    if (updatedRows.length > 0) {
      return updatedRows[0] as Home;
    }
    return null;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export default homeLike;
