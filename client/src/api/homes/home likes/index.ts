import API from 'api'; // axios instance

export const likeHomeQuery = async (homeId: number) => {
  const { data } = await API.patch(`/homes/${homeId}/like`);
  // data.home => Обновлённый дом
  return data.home;
};

export default likeHomeQuery