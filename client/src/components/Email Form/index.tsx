import { useState } from 'react'
import { sendEmail } from 'api/email'

const EmailForm = () => {
  // formData holds the values for the three inputs
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    text: '',
  })
  // loading = true while we wait for the API response
  const [loading, setLoading] = useState(false)
  // message shows success or error feedback
  const [message, setMessage] = useState('')

  // update formData when user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    })
  }

  // send the email when form is submitted
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // call the API with the whole formData object
      await sendEmail(formData)
      setMessage('Email sent successfully!')
      // clear the form
      setFormData({ to: '', subject: '', text: '' })
    } catch {
      setMessage('Failed to send email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Send an Email</h2>

      {/* show feedback message */}
      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes('success') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        {/* recipient email */}
        <input
          type="email"
          name="to"
          placeholder="Recipient Email"
          value={formData.to}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        {/* email subject */}
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        {/* message body */}
        <textarea
          name="text"
          placeholder="Message"
          value={formData.text}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        {/* submit button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  )
}

export default EmailForm
