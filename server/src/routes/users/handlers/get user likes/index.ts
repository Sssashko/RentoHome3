import { Request, Response } from 'express'
import pool from 'database'

const handleGetUserLikes = async (req: Request, res: Response) => {
  try {
    // parse (analizēt) user ID from URL params
    const userId = Number(req.params.id)
    // select only home_id values where this user has liked
    const sql = 'SELECT home_id FROM likes WHERE user_id = ?'
    const [rows] = await pool.query(sql, [userId])

    // extract array of home IDs
    const likedHomeIds = Array.isArray(rows)
      ? (rows as any[]).map((row) => row.home_id)
      : []

    // return the list of liked home IDs
    return res.json({ success: true, likes: likedHomeIds })
  } catch (error) {
    console.error('Error fetching user likes:', error)
    // on error, send 500
    return res.status(500).json({ success: false, message: 'Error fetching user likes' })
  }
}

export default handleGetUserLikes
