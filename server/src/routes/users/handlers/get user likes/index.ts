import { Request, Response } from 'express';
import pool from 'database';

const handleGetUserLikes = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const sql = 'SELECT home_id FROM likes WHERE user_id = ?';
    const [rows] = await pool.query(sql, [userId]);
    const likedHomeIds = Array.isArray(rows)
      ? (rows as any[]).map((row) => row.home_id)
      : [];
    return res.json({ success: true, likes: likedHomeIds });
  } catch (error) {
    console.error('Error fetching user likes:', error);
    return res.status(500).json({ success: false, message: 'Error fetching user likes' });
  }
};

export default handleGetUserLikes;
