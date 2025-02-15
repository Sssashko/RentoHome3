import pool from 'database'
import { RowDataPacket } from 'mysql2'

const getRefreshToken = async (userId: number) => {
	const sql = `
    SELECT token, user_id FROM refreshTokens
    WHERE user_id = ?
  `;
	const [rows] = await pool.query<RowDataPacket[]>(sql, [userId]);

	if (rows.length) {
		console.log('Refresh Token found:', rows[0]); // Проверяем наличие id
		return rows[0].token;
	} else {
		console.log('No Refresh Token found');
		return null;
	}
};


export default getRefreshToken
