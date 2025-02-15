import API from 'api';
import { User } from 'types';

const updateProfile = async (body: FormData) => {
  console.log('🚀 Sending PATCH request to /users/update with:', body);

  try {
const { data } = await API.patch<User>('/users/update', body, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // 👈 Добавляем токен в заголовок
    },
    withCredentials: true // 👈 Добавляем, если сервер использует куки
});


    console.log('✅ Response received:', data);
    return data;
  } catch (error) {
    console.error('❌ Error in updateProfile:', error);
    throw error;
  }
};

// 👇 ВАЖНО: именно так должен быть экспорт
export default updateProfile;
