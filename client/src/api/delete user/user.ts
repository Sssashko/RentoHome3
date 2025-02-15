
import API from 'api';  // Ваш Axios-инстанс

const deleteUser = async (userId: number) => {
  // Формируем DELETE-запрос к /users/:id
  const { data } = await API.delete(`/users/${userId}`, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

export default deleteUser;
