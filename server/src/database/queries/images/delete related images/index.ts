import pool from 'database'

/**
 * Delete all images associated with a given home.
 * @param homeId - ID of the home whose images to remove
 */
const deleteRelatedImages = async (homeId: number) => {
  const sql = `
    DELETE FROM images
    WHERE home_id = ?
  `
  await pool.query(sql, [homeId])
}

export default deleteRelatedImages
