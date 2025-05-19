import pool from 'database'

/**
 * Update one or more fields on an existing user.
 * Builds dynamic SET clause based on provided keys.
 * @param id - ID of the user to update
 * @param updates - partial object with one or more of username, email, password, avatar
 */
const updateUser = async (
  id: number,
  updates: Partial<{
    username: string
    email: string
    password: string
    avatar: string
  }>
) => {
  const fields = Object.keys(updates)
  if (fields.length === 0) return  // if update id empty, nothing to do

  // build "field = ?" segments and collect values
  const setClause = fields.map(field => `${field} = ?`).join(', ')
  const values = fields.map(field => (updates as any)[field]).concat(id)

  const sql = `
    UPDATE users
    SET ${setClause}
    WHERE id = ?
  `
  await pool.query(sql, values)
}

export default updateUser
