import { Request, Response } from 'express';
import createComment from 'database/queries/comments/create comment';
import { User } from 'types';

const handleCreateComment = async (req: Request, res: Response) => {
  try {
    // 1) Получаем пользователя из req.user (мидлвара authenticate должна его установить)
    const user = req.user as User;
    if (!user || !user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized (no user)' });
    }

    // 2) Считываем данные комментария из тела запроса
    // Если отправляете JSON (Content-Type: application/json), можно брать напрямую:
    const { home_id, text } = req.body;

    if (!home_id || !text) {
      return res.status(400).json({ success: false, message: 'Invalid comment data' });
    }

    // 3) Создаём комментарий
    const commentId = await createComment({ home_id, text }, user.id);

    // 4) Формируем ответ
    const createdComment = {
      id: commentId,
      home_id,
      text,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      },
      created_at: new Date()
    };

    return res.status(200).json({ success: true, comment: createdComment });
  } catch (error) {
    console.error('Error while creating comment', error);
    return res.status(500).json({ success: false, message: 'Error while creating comment' });
  }
};

export default handleCreateComment;
