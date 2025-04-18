import API from 'api';

export interface UserLikesResponse {
  success: boolean;
  likes: number[]; // массив ID домов, которым поставлен лайк
}

const fetchUserLikes = async (userId: number): Promise<UserLikesResponse> => {
  const { data } = await API.get<UserLikesResponse>(`/users/${userId}/likes`);
  return data;
};

export default fetchUserLikes;
