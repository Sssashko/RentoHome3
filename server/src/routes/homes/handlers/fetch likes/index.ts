import { Request, Response } from 'express'
import pool from 'database'
import { RowDataPacket } from 'mysql2'

/**
 * Handler to fetch all likes for a specific home.
 * @param req  - Express Request object (expects `req.params.id` as home ID)
 * @param res  - Express Response object (used to return JSON with likes)
 */
const handleFetchLikes = async (req: Request, res: Response) => {
  try {
    // extract home ID from URL params and convert to number
    const homeId = Number(req.params.id)

    const sql = `
      SELECT *
      FROM likes
      WHERE home_id = ?
    `
    // execute query, rows will be array of like records
    const [rows] = await pool.query<RowDataPacket[]>(sql, [homeId])

    // send back success flag and the likes array
    return res.json({ success: true, likes: rows })
  } catch (error) {
    console.error('Error fetching likes:', error)
    // on error, respond with HTTP 500 and error message
    return res.status(500).json({ success: false, message: 'Error fetching likes' })
  }
}

export default handleFetchLikes
