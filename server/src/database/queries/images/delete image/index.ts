import pool from 'database';

const deleteImage = async (url: string) => {
  const sql = `DELETE FROM images WHERE url = ?`;
  return pool.query(sql, [url]);
};

export default deleteImage;
