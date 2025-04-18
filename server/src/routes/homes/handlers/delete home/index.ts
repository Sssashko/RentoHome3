// server/src/routes/homes/handlers/delete home.ts
import { Request, Response } from 'express';
import pool from 'database';
import {
  fetchRelatedImages,
  deleteRelatedImages,
} from 'database/queries/images';
import { deleteHome } from 'database/queries/homes';
import { deleteFiles } from 'helpers';

/** helper: превращаем полный URL в имя файла */
const urlToFileName = (url: string) => url.split('/').pop() || url;

const handleDeleteHome = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    /* 1️⃣ комментарии и лайки */
    await pool.query('DELETE FROM comments WHERE home_id = ?', [id]);
    await pool.query('DELETE FROM likes     WHERE home_id = ?', [id]);

    /* 2️⃣ изображения (записи + файлы) */
    const images = (await fetchRelatedImages(id)) || []; // string[] (URL)
    await deleteRelatedImages(id);                      // remove DB rows
    if (images.length) {
      await deleteFiles(...images.map(urlToFileName));  // remove files
    }

    /* 3️⃣ сам дом */
    await deleteHome(id);

    return res
      .status(200)
      .json({ success: true, message: 'Home deleted' });
  } catch (e) {
    console.error('Error while deleting home', e);
    return res
      .status(500)
      .json({ success: false, message: 'Error while deleting home' });
  }
};

export default handleDeleteHome;
