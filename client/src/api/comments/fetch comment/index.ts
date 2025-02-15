import API from 'api';
import { Comment } from 'types';

/**
 * Запрашивает список комментариев для конкретного дома
 * (GET /homes/:homeId/comments)
 * @param homeId - идентификатор дома
 * @returns массив комментариев
 */
const fetchComments = async (homeId: number): Promise<Comment[]> => {
  const { data } = await API.get<Comment[]>(`/homes/${homeId}/comments`);
  return data;
};

export default fetchComments;
