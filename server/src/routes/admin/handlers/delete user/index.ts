import { Request, Response } from 'express';
import pool from 'database';

/**
 * Delete a user only if they have no active listings.
 */
export default async function handleDeleteAnyUser(req: Request, res: Response) {
  const userId = Number(req.params.id);
  try {
    // 1) Count how many listings this user has
    const [[{ cnt }]]: any = await pool.query(
      'SELECT COUNT(*) AS cnt FROM homes WHERE user = ?',
      [userId]
    );
    if (cnt > 0) {
      // 2) If there are any listings, block deletion
      return res.status(400).json({
        success: false,
        message: 'Cannot delete user with active listings. Remove their listings first.'
      });
    }

    // 3) Delete all likes and comments by this user to avoid dangling references
    await pool.query('DELETE FROM likes WHERE user_id = ?', [userId]);
    await pool.query('DELETE FROM comments WHERE user_id = ?', [userId]);

    // 4) Finally, delete the user record
    await pool.query('DELETE FROM users WHERE id = ?', [userId]);

    return res.json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Admin.deleteAnyUser error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
