import axios from 'axios';

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const sendEmail = async (data: { to: string; subject: string; text: string }) => {
  return await axios.post(`${VITE_SERVER_URL}/email/send`, data);
};
