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
      className="glass-card p-5 sm:p-8 border-white/5"
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="p-2.5 sm:p-3 bg-blue-500/10 rounded-lg sm:rounded-xl">
          <Quote className="text-blue-400 w-5 h-5 sm:w-8 sm:h-8 flex-shrink-0" />
        </div>
        <div>
          <p className="text-gray-100 text-sm sm:text-xl font-medium italic mb-2 sm:mb-3 leading-relaxed">
            "{quote.text}"
          </p>
          <p className="text-blue-400 text-[0.65rem] sm:text-sm font-bold tracking-wider sm:tracking-wide uppercase">
            — {quote.author}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
