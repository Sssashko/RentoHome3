import API from 'api';  // Axios instance

// Delete a user by their ID
const deleteUser = async (userId: number) => {
  // send DELETE request to /users/:id
  const { data } = await API.delete(`/users/${userId}`, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  // return server response
  return data;
};

export default deleteUser;
