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
      className="glass-card p-6 sm:p-8 border-white/5 relative overflow-hidden group"
    >
      <Quote className="absolute -right-6 -bottom-6 w-40 h-40 text-blue-500/5 group-hover:text-blue-500/10 transition-colors duration-700 transform -rotate-12 pointer-events-none" />

      <div className="relative z-10 flex items-start gap-4 sm:gap-6">
        <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl border border-white/5 shadow-inner">
          <Quote className="text-blue-400 w-5 h-5 sm:w-7 sm:h-7 flex-shrink-0" />
        </div>
        <div className="flex-1 mt-1">
          <p className="text-gray-200 text-base sm:text-lg lg:text-xl font-medium italic mb-4 leading-relaxed font-serif tracking-wide">
            "{quote.text}"
          </p>
          <div className="flex items-center gap-3">
            <div className="h-px w-6 sm:w-8 bg-blue-500/50" />
            <p className="text-blue-400 text-[0.65rem] sm:text-xs font-bold tracking-[0.2em] uppercase">
              {quote.author}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
