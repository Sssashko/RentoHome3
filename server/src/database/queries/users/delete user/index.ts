import pool from 'database'

/**
 * Remove a user record by its ID.
 * @param id - the user's ID to delete
 */
const deleteUser = async (id: number) => {
  const sql = `
    DELETE FROM users
    WHERE id = ?
  `
  await pool.query(sql, [id])
}

export default deleteUser
