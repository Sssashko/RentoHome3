import pool from 'database'
import { ResultSetHeader } from 'mysql2'
import { Car } from 'types'

const createCar = async (
	{ model, year, price, power, class: carClass, country, description }: Car, // Renamed `class` to `carClass`
	user: number
) => {
	const sql = `
    INSERT INTO cars
    (model, year, price, power, type, transmission, description, user)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
	const [result] = await pool.query(sql, [
		model,
		year,
		price,
		power,
		carClass, // Use `carClass` here
		country,
		description,
		user
	])

	return (result as ResultSetHeader).insertId
}

export default createCar
