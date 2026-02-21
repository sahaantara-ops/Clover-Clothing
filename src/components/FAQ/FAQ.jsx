'use client'
import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        className="w-full text-left flex justify-between items-center text-gray-800 font-medium focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        {question}
        <span className={`transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const FAQPage = () => {
  const [faqs, setFaqs] = useState([
    {
      question: 'What is Clover Clothing?',
      answer: 'Clover Clothing is a modern apparel brand focused on quality and style.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship worldwide. Shipping fees vary by location.',
    },
    {
      question: 'What is your return policy?',
      answer: 'You can return items within 14 days of delivery in their original condition.',
    },
    {
      question: 'How can I track my order?',
      answer: 'After purchase, you will receive a tracking link via email.',
    },
  ]);

  const [newQuestion, setNewQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setFaqs([...faqs, { question: newQuestion, answer: 'We will answer this soon!' }]);
    setNewQuestion('');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h1>

      <div className="bg-gray-200 shadow-md rounded-lg divide-y divide-gray-300 mb-8">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      {/* Form to submit new question */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Have a question?</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default FAQPage;