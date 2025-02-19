import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fuzlfxgbzszhxxqvzdve.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1emxmeGdienN6aHh4cXZ6ZHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5Njc5MDgsImV4cCI6MjA1NTU0MzkwOH0.Uw2ku4EXQAX6LPSzqbkxfEZqhQsmRJ0_7Xyh2uP-STs';

let supabase;
try {
  new URL(supabaseUrl); // Validate the URL
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.error("Invalid Supabase URL:", error);
  supabase = null;
}

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string, name: string) => void;
}

function FeedbackModal({ isOpen, onClose, onSubmit }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim() === '') {
      alert('Please enter your name.');
      return;
    }
    onSubmit(feedback, name);
    onClose();
    setFeedback('');
    setName('');
  };

  const modalVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 20, display: "none" },
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Feedback</h2>
        <input
          type="text"
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="w-full h-32 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          placeholder="Share your thoughts and suggestions..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="mt-3 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export function FeedbackBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (feedback: string, name: string) => {
    if (!supabase) {
      console.error("Supabase client not initialized.");
      alert("Failed to submit feedback.");
      return;
    }

    const { error } = await supabase
      .from('feedbacks')
      .insert([{ content: feedback, name: name }]);

    if (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    } else {
      alert('Feedback submitted successfully!');
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
        onClick={() => setIsModalOpen(true)}
      >
        Give Feedback
      </button>
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
