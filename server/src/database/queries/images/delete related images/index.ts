import pool from 'database'

const deleteRelatedImages = async (homeId: number) => {
	const sql = `
    DELETE FROM images
    WHERE home = ?
    `
	await pool.query(sql, [homeId])
}

export default deleteRelatedImages
