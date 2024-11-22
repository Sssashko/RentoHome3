import { SERVER_URL } from 'config';
import { updateHome } from 'database/queries/homes';
import { createImage, deleteImage } from 'database/queries/images';
import { Request, Response } from 'express';
import { deleteFiles } from 'helpers';
import { Home } from 'types';

const handleUpdateHome = async (req: Request, res: Response) => {
  try {
    const home = JSON.parse(req.body.home) as Home;

    if (Array.isArray(req.files)) {
      await Promise.all(
        req.files.map(async (file) => {
          const fileName = file.filename;
          const originalName = file.originalname;

          const url = `${SERVER_URL}/images/${file.filename}`;

          await createImage(fileName, originalName, url, home.id);
          home.images.push({ name: fileName, originalName, url });
        })
      );
    }

    const removedImages = JSON.parse(req.body.removedImages) as string[];

    home.images = home.images.filter(({ url }) => !removedImages.includes(url));

    await Promise.all([deleteFiles(...removedImages), updateHome(home)]);

    res.status(200).json(home);
  } catch (error) {
    console.log('An error occurred while updating home', error);
    res.status(500).json('An error occurred while updating home');
  }
};

export default handleUpdateHome;
