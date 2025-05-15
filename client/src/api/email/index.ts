import axios from 'axios';

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Send an email via backend service
export const sendEmail = async (data: {
  to: string;     // recipient email address
  subject: string; // email subject line
  text: string;    // email body text
}) => {
  // POST request to /email/send endpoint with JSON payload
  return await axios.post(`${VITE_SERVER_URL}/email/send`, data);
};
