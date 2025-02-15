import pool from 'database'
import { ResultSetHeader } from 'mysql2'
import { Home } from 'types'

const createHome = async (
	{  title, price, square, class: homeClass, type, country, description }: Home, 
	user: number
) => {
	const sql = `
    INSERT INTO homes
    ( title, price, square, class, type, country, description, user)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
	const [result] = await pool.query(sql, [
		title,
		price,
		square,
		homeClass, 
		type,
		country,
		description,
		user
	])

	return (result as ResultSetHeader).insertId
}

export default createHome
