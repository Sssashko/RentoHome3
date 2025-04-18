import React, { useState, useRef, useEffect } from 'react'

type FAQItem = { q: string; a: string }

const faqs: FAQItem[] = [
  {
    q: 'How do I book a home?',
    a: `Select a listing on the “Listings” page, choose your check‑in and check‑out dates, then click “Reserve”. You’ll receive a confirmation email once your booking is complete.`,
  },
  {
    q: 'What payment methods are accepted?',
    a: `We accept Visa, MasterCard, Apple Pay, and Google Pay. All transactions are processed through a secure payment gateway.`,
  },
  {
    q: 'How do I list or edit my property?',
    a: `Navigate to “List Home” (or “My Listings” → “Edit”), fill in the form (title, description, price, photos) and hit “Save”. Your changes will go live immediately.`,
  },
  {
    q: 'Why can’t I upload my photos?',
    a: `Make sure your images are JPG or PNG and under 5 MB. If you still have issues, clear your cache or try a different browser.`,
  },
  {
    q: 'Who do I contact for technical support?',
    a: `Our support team is available 24/7. Email us at support@rentohome.com or use the live chat widget in the bottom right corner of the site.`,
  },
]

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-12">
          Frequently&nbsp;Asked&nbsp;Questions
        </h2>

        <ul className="space-y-4">
          {faqs.map((item, i) => (
            <Accordion
              key={i}
              item={item}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FAQ

/* ---------- sub‑component with smooth height animation ---------- */

interface AccProps {
  item: FAQItem
  open: boolean
  onToggle: () => void
}

/* ---------- simplified accordion (no gradient) ---------- */

const Accordion: React.FC<AccProps> = ({ item, open, onToggle }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)
  
    useEffect(() => {
      setHeight(open && ref.current ? ref.current.scrollHeight : 0)
    }, [open])
  
    return (
      <li className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {item.q}
          </span>
          <span
            className={`text-blue-600 dark:text-blue-400 transform transition-transform duration-300 ${
              open ? 'rotate-90' : ''
            }`}
          >
            ▶
          </span>
        </button>
  
        <div
          style={{ maxHeight: height }}
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        >
          <div ref={ref} className="px-6 py-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            {item.a}
          </div>
        </div>
      </li>
    )
  }
  