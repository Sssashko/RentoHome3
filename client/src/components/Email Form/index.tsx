import { useState } from 'react';
import { sendEmail } from 'api/email';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    text: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await sendEmail(formData); // ✅ Передаем объект, а не отдельные аргументы
      setMessage('Email sent successfully!');
      setFormData({ to: '', subject: '', text: '' });
    } catch {
      setMessage('Failed to send email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Send an Email</h2>
      {message && <p className={`mt-2 text-sm ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
        {message}
      </p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          name="to"
          placeholder="Recipient Email"
          value={formData.to}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="text"
          placeholder="Message"
          value={formData.text}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
