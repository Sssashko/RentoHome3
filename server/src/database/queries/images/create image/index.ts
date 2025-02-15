import pool from 'database';

const createImage = async (name: string, originalName: string, url: string, userId?: number, homeId?: number) => {
    const sql = `
        INSERT INTO images (name, originalName, url, home)
        VALUES (?, ?, ?, ?)
    `;

    const value = homeId ? homeId : userId; // Выбираем, что передавать: user или home

    await pool.query(sql, [name, originalName, url, value]);
};

export default createImage;
