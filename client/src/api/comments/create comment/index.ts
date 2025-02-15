import API from 'api';
import { Comment } from 'types';

// Аналог createHome, но для комментария
const createComment = async (homeId: number, body: FormData) => {
  // Отправляем POST /homes/:homeId/comments
  const { data } = await API.post<Comment>(`/homes/${homeId}/comments`, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export default createComment;
