import { FaEnvelope } from 'react-icons/fa'
import { sendEmail } from 'api/email'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  message: string
}

const Support = () => {
  // form loading & status state
  const [loading, setLoading] = useState(false)            // show spinner while sending
  const [status, setStatus] = useState<string | null>(null) // display success/error message

  // react-hook-form setup with validation rules
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>()

  // on form submit -> send email via API helper
  const onSubmit = async (data: FormData) => {
    setLoading(true)   // start loading
    setStatus(null)    // clear previous status

    try {
      await sendEmail({
        to: 'rentohomecontact@gmail.com',
        subject: `Support Request from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      })
      setStatus('✔ Message sent! We’ll respond soon.')  // success feedback
      reset()                                            // clear form fields
    } catch {
      setStatus('✖ Could not send message. Please try again.') // error feedback
    }

    setLoading(false)  // end loading
  }

  return (
    <div className="min-h-screen bg-gray-150 dark:bg-gray-900 py-16 px-6 sm:px-12 lg:px-24">
      {/* page header */}
      <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400">
        Support&nbsp;
        <span className="text-gray-800 dark:text-gray-300 font-light">/ Help Center</span>
      </h1>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
        Drop us a line – we’re here for you 24/7!
      </p>

      {/* contact form */}
      <section className="mt-20 max-w-2xl mx-auto bg-white dark:bg-gray-800/80 backdrop-blur rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <FaEnvelope /> Contact Us
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Fill in the form – our team replies within a few hours.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-6">
          {/* Name input with validation */}
          <div>
            <input
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 3, message: 'At least 3 characters' }
              })}
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email input with pattern check */}
          <div>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                }
              })}              
              name="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Message textarea with min length */}
          <div>
            <textarea
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'At least 10 characters' }
              })}
              name="message"
              rows={5}
              placeholder="How can we help?"
              className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
            {errors.message && (
              <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Send message'}
          </button>
        </form>

        {/* status feedback */}
        {status && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
            {status}
          </p>
        )}
      </section>

      {/* alternate contact methods */}
      <section className="mt-16 text-center">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Other ways to reach us
        </h2>
        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-6">
          {/* mailto link */}
          <a href="mailto:rentohomecontact@rentohome.com" className="flex items-center gap-3 group">
            <FaEnvelope className="text-blue-500 group-hover:animate-pulse" size={20} />
            <span className="text-gray-800 dark:text-gray-200 hover:underline">
              rentohomecontact@rentohome.com
            </span>
          </a>
          <span className="hidden sm:block text-gray-400">|</span>
          {/* phone support */}
          <span className="text-gray-600 dark:text-gray-400">
            24 / 7 hotline: +1 (555) 987-6543
          </span>
        </div>
      </section>
    </div>
  )
}

export default Support
