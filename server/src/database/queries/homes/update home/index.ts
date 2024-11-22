import pool from 'database'
import { Home } from 'types'

const updateHome = async ({
	id,
	year,
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
        year = ?,
        price = ?,
        square = ?,
        class = ?,
        type = ?,
        country = ?,
        description = ?
    WHERE id = ?
    `
	await pool.query(sql, [ year, price, square, homeClass, type, country, description, id]) 
}

export default updateHome
