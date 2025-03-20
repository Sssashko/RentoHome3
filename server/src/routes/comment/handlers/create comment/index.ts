import { SERVER_URL } from 'config';
import { Request, Response } from 'express';
import { User } from 'types';
import createComment from 'database/queries/comments/create comment';

const handleCreateComment = async (req: Request, res: Response) => {
  try {
    // 1) Берём пользователя из req.user
    const user = req.user as User;
    // 2) Парсим JSON из req.body.comment (по аналогии с req.body.home)
    const comment = JSON.parse(req.body.comment) as {
      home_id: number;
      text: string;
    };

    // 3) Вызываем createComment
    const commentId = await createComment(comment, user.id);

    // 5) Собираем объект, который вернём клиенту
    const createdComment = {
      id: commentId,
      home_id: comment.home_id,
      text: comment.text,
      user, // автор комментария
      // images: uploaded, // если нужно
      created_at: new Date()
    };

    res.status(200).json(createdComment);
  } catch (error) {
    console.log('Error while creating comment', error);
    res.status(500).json('Error while creating comment');
  }
};

export default handleCreateComment;
