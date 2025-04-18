import { Request, Response } from 'express';
import { SERVER_URL }          from 'config';
import { createImage }         from 'database/queries/images';
import { updateHome }          from 'database/queries/homes';
import deleteImage             from 'database/queries/images/delete image';
import { deleteFiles }         from 'helpers';
import { Home }                from 'types';

/**
 * PATCH  /homes            (multipart/form‑data)
 * body:
 *   ├── home           – stringified JSON <Home>
 *   ├── removedImages  – stringified JSON string[] (полные URL)
 *   └── files[]        – новые картинки
 */
const handleUpdateHome = async (req: Request, res: Response) => {
  try {
    /* ─────────── Debug: what exactly came from the client ─────────── */
    console.log('=== handleUpdateHome DEBUG ===');
    console.log('req.body.home =',           req.body.home);
    console.log('req.body.removedImages =',  req.body.removedImages);
    console.log('req.files =',               req.files);
    console.log('=== /DEBUG ===');

    /* ---------------------------------------------------------------- */

    const home = JSON.parse(req.body.home) as Home;

    /* ---------- 1.  Save new uploaded images and extend home.images -------- */
    if (Array.isArray(req.files)) {
      for (const file of req.files) {
        const fileName      = file.filename;            // saved name on disk
        const originalName  = file.originalname;        // original from user
        const url           = `${SERVER_URL}/images/${fileName}`;

        // insert into DB
        await createImage(fileName, originalName, url, home.id);

        // keep in JS object so UPDATE has the full list
        if (!home.images) home.images = [];
        home.images.push({ name: fileName, originalName, url });
      }
    }

    /* ---------- 2.  Remove images requested by the client ------------------ */
    const removedImages: string[] = JSON.parse(req.body.removedImages ?? '[]');

    for (const url of removedImages) {
      /* 2‑a: delete row from DB */
      const [result] = await deleteImage(url) as any;          // result: ResultSetHeader
      if (result.affectedRows === 0) {
        console.warn('[handleUpdateHome] DB row not found for', url);
      }

      /* 2‑b: delete physical file (ignore ENOENT) */
      const fileName = url.split('/').pop();                   // abc.jpg
      if (fileName) {
        try {
          await deleteFiles(fileName);
        } catch (err: any) {
          if (err.code !== 'ENOENT') throw err;                // real FS error
          console.warn('[handleUpdateHome] File already deleted', fileName);
        }
      }
    }

    /* убрать ссылки на удалённые картинки из объекта home, чтобы
       UPDATE не нарушил FK images(home_id)  */
    home.images = home.images?.filter(img => !removedImages.includes(img.url));

    /* ---------- 3.  Update the home record itself ------------------------- */
    await updateHome(home);

    return res.status(200).json(home);
  } catch (err) {
    console.error('Error while updating home', err);
    return res.status(500).json({ success: false, message: 'Error while updating home' });
  }
};

export default handleUpdateHome;
