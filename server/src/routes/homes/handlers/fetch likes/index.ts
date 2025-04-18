// server/src/routes/homes/handlers/handleFetchLikes.ts
import { Request, Response } from 'express';
import pool from 'database';
import { RowDataPacket } from 'mysql2';

const handleFetchLikes = async (req: Request, res: Response) => {
  try {
    const homeId = Number(req.params.id);
    const sql = `
      SELECT *
      FROM likes
      WHERE home_id = ?
    `;
    const [rows] = await pool.query<RowDataPacket[]>(sql, [homeId]);
    return res.json({ success: true, likes: rows });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return res.status(500).json({ success: false, message: 'Error fetching likes' });
  }
};

export default handleFetchLikes;
