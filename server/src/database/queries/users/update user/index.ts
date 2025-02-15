import pool from 'database';

const updateUser = async (id: number, updates: Partial<{ username: string; email: string; password?: string; avatar?: string }>) => {
    const fields = Object.keys(updates);
    if (fields.length === 0) return; // Если нечего обновлять — просто выходим

    const sql = `
        UPDATE users
        SET ${fields.map(field => `${field} = ?`).join(', ')}
        WHERE id = ?
    `;

    const values = [...fields.map(field => updates[field as keyof typeof updates]!), id];

    await pool.query(sql, values);
};

export default updateUser;
