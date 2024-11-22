import pool from 'database'
import { RowDataPacket } from 'mysql2'
import { Image } from 'types'

const fetchRelatedImages = async (homeId: number) => {
	const sql = `
    SELECT * FROM images
    WHERE home = ?
    `
	const [rows] = await pool.query<RowDataPacket[]>(sql, [homeId])

	if (rows.length) {
		return (rows as Image[]).map(({ url }) => url)
	} else {
		return null
	}
}

export default fetchRelatedImages
