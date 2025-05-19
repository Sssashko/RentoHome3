import pool from 'database'
import { Home } from 'types'

/**
 * Update an existing home listing.
 * @param home - full Home object with updated fields
 */
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
  // Update only the specified columns for the given home ID
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
  await pool.query(sql, [
    title,
    price,
    square,
    homeClass,
    type,
    country,
    description,
    id
  ])
}

export default updateHome
