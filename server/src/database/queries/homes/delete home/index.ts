import pool from 'database'

const deleteHome = async (homeId: number) => {
	const sql = `
    DELETE FROM homes 
    WHERE id = ?
    `
	await pool.query(sql, [homeId])
}

export default deleteHome
