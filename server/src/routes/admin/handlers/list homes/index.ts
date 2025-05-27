import { Request, Response } from 'express'
import pool from 'database'

/**
 * List all homes along with their owner's username
 */
export default async function handleListAllHomes(req: Request, res: Response) {
  try {
    // 1) Fetch homes and join to users table to get owner name
    const [rows] = await pool.query(
      `SELECT
         h.id, h.title, h.price, h.square, h.class, h.type,
         h.country, h.description, h.likes,
         u.username AS owner
       FROM homes h
       LEFT JOIN users u ON h.user = u.id`
    )

    // 2) Return combined data
    return res.json(rows)
  } catch (err) {
    console.error('Admin.listHomes error:', err)
    return res.status(500).json({ message: 'Failed to list homes' })
  }
}
