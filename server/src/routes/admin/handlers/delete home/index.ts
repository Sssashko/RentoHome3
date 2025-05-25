import { Request, Response } from 'express';
import {
  fetchRelatedImages, 
  deleteImage,        
  deleteRelatedImages 
} from 'database/queries/images';
import pool from 'database';

/**
 * Remove a home and all its associated images.
 */
export default async function handleDeleteAnyHome(req: Request, res: Response) {
  const { id } = req.params;
  try {
    // Get all image URLs for this home
    const urls = await fetchRelatedImages(Number(id));
    // Delete each file in parallel
    await Promise.all(urls.map(deleteImage));
    // Remove image entries from the database
    await deleteRelatedImages(Number(id));
    // Delete the home record
    await pool.query('DELETE FROM homes WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Home and images deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to delete home' });
  }
}