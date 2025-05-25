import { Request, Response } from 'express';
import pool from 'database';

/**
 * Retrieve all homes, each including its images.
 */
export default async function handleListAllHomes(req: Request, res: Response) {
  try {
    const [rows] = await pool.query(
      `SELECT h.id, h.title, h.price, h.square, h.type, h.class, h.country,
              h.description, h.user,
              JSON_ARRAYAGG(JSON_OBJECT('id', i.id, 'url', i.url)) AS images
       FROM homes h
       LEFT JOIN images i ON i.home_id = h.id
       GROUP BY h.id`
    );
    return res.json(rows);
  } catch (err) {
    console.error('Admin.listAllHomes error:', err);
    return res.status(500).json({ message: 'Failed to list homes' });
  }
}