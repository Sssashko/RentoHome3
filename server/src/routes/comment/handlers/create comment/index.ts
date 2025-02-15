import { SERVER_URL } from 'config';
import { Request, Response } from 'express';
import { User } from 'types';
import createComment from 'database/queries/comments/create comment';
// Если хочешь загружать картинки для комментария, можешь подключить что-то вроде createImage

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

    // 4) Если хотим загружать картинки для комментария, делаем по аналогии:
    // const uploaded: Omit<Image, 'id'>[] = [];
    // if (Array.isArray(req.files)) {
    //   await Promise.all(
    //     req.files.map(async (file) => {
    //       const fileName = file.filename;
    //       const originalName = file.originalname;
    //       const url = `${SERVER_URL}/images/${file.filename}`;
    //       // await createImage(fileName, originalName, url, commentId); // если нужна таблица images для комментов
    //       uploaded.push({ name: fileName, originalName, url });
    //     })
    //   );
    // }

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
