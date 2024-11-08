import pool from 'database'
import { Car } from 'types'

const updateCar = async ({
	id,
	model,
	year,
	price,
	power,
	class: carClass, // Renamed `class` to `carClass`
	country,
	description
}: Car) => {
	const sql = `
    UPDATE cars
    SET
        model = ?,
        year = ?,
        price = ?,
        power = ?,
        type = ?,
        transmission = ?,
        description = ?
    WHERE id = ?
    `
	await pool.query(sql, [model, year, price, power, carClass, country, description, id]) // Use `carClass` here
}

export default updateCar
