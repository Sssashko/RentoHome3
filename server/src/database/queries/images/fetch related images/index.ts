import pool from 'database';

/**
 * Fetch image URLs for a specific home ID from the images table.
 * Returns an array of URL strings (empty if none found).
 */
export default async function fetchRelatedImages(homeId: number): Promise<string[]> {
  // Query the database for image records matching the homeId
  const [rows]: any[] = await pool.query(
    'SELECT url FROM images WHERE home_id = ?',
    [homeId]
  );
  // Extract and return the url field from each row
  return rows.map((r: any) => r.url);
}