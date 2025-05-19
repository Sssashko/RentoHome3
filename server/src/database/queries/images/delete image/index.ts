import pool from 'database'

/**
 * Remove a single image by its URL.
 * @param url - URL of the image to delete
 */
const deleteImage = async (url: string) => {
  const sql = `
    DELETE FROM images
    WHERE url = ?
  `
  return pool.query(sql, [url])
}

export default deleteImage
