import { Request, Response } from 'express';
import toggleLikeHome from 'database/queries/homes/like home';
import { Home } from 'types';

const handleLike = async (req: Request, res: Response) => {
  try {
    const homeId = Number(req.params.id);
    const userId = (req.user as { id: number }).id; // получение id пользователя из мидлвари authenticate

    if (!homeId || !userId) {
      return res.status(400).json({ success: false, message: 'Invalid parameters' });
    }

    const updatedHome: Home | null = await toggleLikeHome(homeId, userId);
    if (!updatedHome) {
      return res.status(404).json({ success: false, message: 'Home not found' });
    }

    return res.json({ success: true, home: updatedHome });
  } catch (error) {
    console.error('Error while toggling like:', error);
    return res.status(500).json({ success: false, message: 'Error while toggling like' });
  }
};

export default handleLike;
