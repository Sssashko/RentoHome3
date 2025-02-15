import pool from 'database'
import { RowDataPacket } from 'mysql2'
import { User } from 'types'

const fetchUserByEmail = async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase() // Приводим email к нижнему регистру перед запросом
    const sql = `
        SELECT * FROM users
        WHERE users.email = ?
    `
    const [result] = await pool.query<RowDataPacket[]>(sql, [normalizedEmail])

    console.log('DB Query Result:', result) // Логируем результат запроса

    if (result.length) {
        return result[0] as User & { password: string }
    } else {
        return null
    }
}

export default fetchUserByEmail
