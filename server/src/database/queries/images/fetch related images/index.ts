import pool from 'database'
import { RowDataPacket } from 'mysql2'
import { Image } from 'types'

/**
 * Fetch all image URLs for a specific home.
 * @param homeId - ID of the home
 * @returns array of URL strings, or null if none found
 */
const fetchRelatedImages = async (homeId: number): Promise<string[] | null> => {
  const sql = `
    SELECT url
    FROM images
    WHERE home_id = ?
  `
  const [rows] = await pool.query<RowDataPacket[]>(sql, [homeId])

  // if there are results, extract just the URL from each row
  return rows.length
    ? (rows as Image[]).map(({ url }) => url)
    : null
}

export default fetchRelatedImages
