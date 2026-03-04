import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fuzlfxgbzszhxxqvzdve.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1emxmeGdienN6aHh4cXZ6ZHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5Njc5MDgsImV4cCI6MjA1NTU0MzkwOH0.Uw2ku4EXQAX6LPSzqbkxfEZqhQsmRJ0_7Xyh2uP-STs';

let supabase: SupabaseClient | null;
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

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white text-center sm:text-left">Feedback</h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Share your thoughts and suggestions..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
          >
            Submit Feedback
          </button>
        </div>
      </motion.div>
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
    <div className="flex flex-col sm:flex-row items-center justify-between glass-card p-4 sm:px-6 sm:py-4 border-white/5 gap-4">
      <div className="text-center sm:text-left">
        <h4 className="text-white font-semibold text-sm sm:text-base">Found a bug or have a suggestion?</h4>
        <p className="text-gray-400 text-xs sm:text-sm">Your feedback helps us improve the experience.</p>
      </div>
      <button
        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all border border-blue-500/20 font-semibold text-sm"
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
