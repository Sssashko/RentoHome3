import { deleteHome } from 'database/queries/homes';
import { deleteRelatedImages, fetchRelatedImages } from 'database/queries/images';
import { Request, Response } from 'express';
import { deleteFiles } from 'helpers';

const handleDeleteHome = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const images = await fetchRelatedImages(id);
    await deleteRelatedImages(id);
    await deleteHome(id);

    if (images) {
      await deleteFiles(...images);
    }
    res.status(200).json('Home has been deleted');
  } catch (error) {
    console.log('Error while deleting home', error);
    res.status(500).json('Error while deleting home');
  }
};

export default handleDeleteHome;
