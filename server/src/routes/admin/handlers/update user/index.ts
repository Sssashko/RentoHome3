import { Request, Response } from 'express';
import pool from 'database';
import { hash } from 'bcrypt';

/**
 * Update provided user fields: username, email, password, avatar URL.
 */
export default async function handleUpdateAnyUser(req: Request, res: Response) {
  try {
    // parse ID and input fields
    const id = Number(req.params.id);
    const { username, email, password } = req.body;
    const avatarFile = req.file;

    // prepare arrays for SET clauses and parameters
    const updates: string[] = [];
    const params: any[] = [];

    if (username) { updates.push('username = ?'); params.push(username); }
    if (email)    { updates.push('email = ?');    params.push(email); }
    // hash and add password update
    if (password) {
      const hashed = await hash(password, 10); // saltRounds = 10
      updates.push('password = ?'); params.push(hashed);
    }
    // build avatar URL and add update
    if (avatarFile) {
      const avatarUrl = `${process.env.SERVER_URL}/images/${avatarFile.filename}`;
      updates.push('avatar = ?'); params.push(avatarUrl);
    }

    // if no fields to update, return error
    if (!updates.length) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    // execute dynamic UPDATE query
    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    params.push(id);
    await pool.query(sql, params);

    // fetch and return updated user (excluding password)
    const [rows] = await pool.query(
      'SELECT id, username, email, avatar, role FROM users WHERE id = ?',
      [id]
    );
    return res.json((rows as any[])[0]);
  } catch (err) {
    console.error('UpdateAnyUser error:', err);
    return res.status(500).json({ message: 'Failed to update user' });
  }
}
