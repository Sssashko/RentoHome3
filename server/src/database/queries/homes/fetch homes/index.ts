import pool from 'database'
import { RowDataPacket } from 'mysql2'
import { Home } from 'types'

const fetchHomes = async () => {
	const sql = `
    SELECT homes.*,
           JSON_OBJECT(
             'id', users.id,
             'username', users.username,
             'email', users.email,
             'avatar', users.avatar
           ) AS user,
           JSON_ARRAYAGG(  
             JSON_OBJECT(
               'name', images.name,
               'originalName', images.originalName,
               'url', images.url
              )
           ) AS images
    FROM homes
    INNER JOIN users ON homes.user = users.id
    LEFT JOIN images ON images.home = homes.id
    GROUP BY homes.id
  `
	const [rows] = await pool.query<RowDataPacket[]>(sql)

	if (rows.length) {
		return rows as Home[]
	} else {
		return []
	}
}

export default fetchHomes
