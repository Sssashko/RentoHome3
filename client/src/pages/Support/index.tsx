import { useState } from 'react';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { sendEmail } from 'api/email'; // Подключение API для отправки email

const faqData = [
  {
    question: "How can I create a listing?",
    answer: "Go to the 'List Home' section, fill in all required fields, and upload photos.",
  },
  {
    question: "How can I edit or delete my listing?",
    answer: "You can edit or delete your listings in the 'My Listings' section.",
  },
  {
    question: "What should I do if I have an issue with booking?",
    answer: "Contact our support team via the form below or by phone.",
  },
];

const Support = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await sendEmail({
        to: 'rentohomecontact@gmail.com',
        subject: `Support Request from ${form.name}`,
        text: `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
      });
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white py-10 px-6 sm:px-12 lg:px-24">
      <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400">Support</h1>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
        Find answers to frequently asked questions or contact us.
      </p>

      {/* FAQ Section */}
      <section className="mt-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border border-gray-300 dark:border-gray-700 rounded-lg">
              <button
                className="w-full flex justify-between items-center p-4 text-left font-semibold"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <FaArrowRight className={`transition-transform ${activeIndex === index ? 'rotate-90' : ''}`} />
              </button>
              {activeIndex === index && (
                <p className="p-4 border-t border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mt-14 max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Contact Us</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Fill out the form, and we will get back to you as soon as possible.</p>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {status && <p className="mt-4 text-center font-semibold">{status}</p>}
      </section>

      {/* Contact Information */}
      <section className="mt-14 text-center">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Contact Information</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">You can also contact us directly:</p>

        <div className="mt-4 flex flex-col items-center space-y-4">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-500 dark:text-blue-400" size={20} />
            <a href="mailto:support@rentohome.com" className="text-gray-800 dark:text-white hover:underline">
              rentohomecontact@rentohome.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
