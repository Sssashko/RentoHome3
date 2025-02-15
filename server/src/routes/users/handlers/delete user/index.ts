import { Request, Response } from 'express';
import deleteRefreshTokens from 'database/queries/refresh tokens/delete token';
import deleteUser from 'database/queries/users/delete user';

const handleDeleteUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      if (!userId || isNaN(userId)) {
        return res.status(400).json('Invalid user ID');
      }
  
      // Сначала чистим токены
      await deleteRefreshTokens(userId);
  
      // Затем удаляем пользователя
      await deleteUser(userId);
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Failed to delete user' });
    }
  };
  
  

export default handleDeleteUser;
