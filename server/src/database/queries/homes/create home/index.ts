import pool from 'database'
import { ResultSetHeader } from 'mysql2'
import { Home } from 'types'

/**
 * Create a new home listing in the database.
 * @param homeData - object containing title, price, square, class, type, country, description
 * @param userId - ID of the user creating the listing
 * @returns the auto-generated ID of the new home record
 */
const createHome = async (
  { title, price, square, class: homeClass, type, country, description }: Home,
  userId: number
) => {
  // SQL to insert all required fields into the homes table
  const sql = `
    INSERT INTO homes
      (title, price, square, class, type, country, description, user)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  // Execute the query with values in correct order
  const [result] = await pool.query<ResultSetHeader>(sql, [
    title,
    price,
    square,
    homeClass,
    type,
    country,
    description,
    userId
  ])

  // Return the newly created record's ID
  return result.insertId
}

export default createHome
