import pool from 'database'
import { Home } from 'types'

const updateHome = async ({
	id,
	title,
	price,
	square,
	class: homeClass,
    type, 
	country,
	description
}: Home) => {
	const sql = `
    UPDATE homes
    SET
        title = ?,
        price = ?,
        square = ?,
        class = ?,
        type = ?,
        country = ?,
        description = ?
    WHERE id = ?
    `
	await pool.query(sql, [ title, price, square, homeClass, type, country, description, id]) 
}

export default updateHome
