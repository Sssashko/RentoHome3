import pool from 'database'

/**
 * Save an image record linked to a home or user.
 *
 * @param name - Internal filename used for storage
 * @param originalName - Original file name as uploaded by the user
 * @param url - Full public URL to access the image
 * @param userId - Optional user ID if the image belongs to a user (e.g. avatar)
 * @param homeId - Optional home ID if the image is associated with a home listing
 * @param position - Optional image order index (used to control display order)
 */
const createImage = async (
  name: string,
  originalName: string,
  url: string,
  userId: number | null = null,
  homeId: number | null = null,
  position: number | null = null
) => {
  // SQL query to insert a new image record into the 'images' table
  const sql = `
    INSERT INTO images (name, originalName, url, user_id, home_id, position)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // Execute the query with the provided values.
  // If position is not provided, it defaults to 0.
  await pool.query(sql, [name, originalName, url, null, homeId, position ?? 0]);
};

export default createImage
