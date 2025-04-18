import { useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { sendEmail } from 'api/email'

const Support = () => {
  /* ---------------- form ---------------- */
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status,  setStatus]  = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setStatus(null)
    try {
      await sendEmail({
        to: 'rentohomecontact@gmail.com',
        subject: `Support Request from ${form.name}`,
        text: `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
      })
      setStatus('✔ Message sent! We’ll respond soon.')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('✖ Could not send message. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-150 dark:bg-gray-900 py-16 px-6 sm:px-12 lg:px-24">
      {/* header */}
      <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400">
        Support&nbsp;
        <span className="text-gray-800 dark:text-gray-300 font-light">/ Help Center</span>
      </h1>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
        Drop us a line – we’re here for you 24/7!
      </p>

      {/* contact form */}
      <section className="mt-20 max-w-2xl mx-auto bg-white dark:bg-gray-800/80 backdrop-blur rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <FaEnvelope /> Contact Us
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Fill in the form – our team replies within a few hours.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-6">
          <input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="How can we help?"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Send message'}
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
            {status}
          </p>
        )}
      </section>

      {/* contact info */}
      <section className="mt-16 text-center">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Other ways to reach us
        </h2>
        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-6">
          <a
            href="mailto:rentohomecontact@rentohome.com"
            className="flex items-center gap-3 group"
          >
            <FaEnvelope className="text-blue-500 group-hover:animate-pulse" size={20} />
            <span className="text-gray-800 dark:text-gray-200 hover:underline">
              rentohomecontact@rentohome.com
            </span>
          </a>
          <span className="hidden sm:block text-gray-400">|</span>
          <span className="text-gray-600 dark:text-gray-400">
            24 / 7 hotline: +1 (555) 987‑6543
          </span>
        </div>
      </section>
    </div>
  )
}

export default Support
