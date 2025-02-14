import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getRandomQuote } from '../data/quotes';

export function QuoteDisplay() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 sm:p-6 rounded-lg shadow-lg"
    >
      <div className="flex items-start gap-4">
        <Quote className="text-blue-400 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mt-1" />
        <div>
          <p className="text-gray-200 text-sm sm:text-lg italic mb-2">{quote.text}</p>
          <p className="text-gray-400 text-xs sm:text-sm">— {quote.author}</p>
        </div>
      </div>
    </motion.div>
  );
}
