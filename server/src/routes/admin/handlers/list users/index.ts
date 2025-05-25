import { Request, Response } from 'express';
import pool from 'database';

/**
 * Fetch all users with basic fields.
 */
export default async function handleListAllUsers(req: Request, res: Response) {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, email, avatar, role FROM users'
    );
    return res.json(rows);
  } catch (err) {
    console.error('Admin.listAllUsers error:', err);
    return res.status(500).json({ message: 'Failed to list users' });
  }
}