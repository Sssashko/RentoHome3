import pool from 'database';
import { RowDataPacket } from 'mysql2';

const fetchLikesByHomeId = async (homeId: number) => {
  const sql = `
    SELECT *
    FROM likes
    WHERE home_id = ?
  `;
  const [rows] = await pool.query<RowDataPacket[]>(sql, [homeId]);
  return rows; // массив записей лайков для конкретного дома
};

export default fetchLikesByHomeId;
