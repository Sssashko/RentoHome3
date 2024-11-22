import pool from 'database'

const createImage = async (name: string, originalName: string, url: string, homeId: number) => {
	const sql = `
    INSERT INTO images
    (name, originalName, url, home)
    VALUES (?, ?, ?, ?)
    `
	await pool.query(sql, [name, originalName, url, homeId])
}

export default createImage
