import pool from 'database'

/**
 * Delete a home listing by its ID.
 * @param homeId - the ID of the home to remove
 */
const deleteHome = async (homeId: number) => {
  // Remove the row matching the given ID
  const sql = `
    DELETE FROM homes
    WHERE id = ?
  `
  await pool.query(sql, [homeId])
}

export default deleteHome
