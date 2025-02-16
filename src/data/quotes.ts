export const quotes = [
  {
    text: "Success is not final; failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Education is not preparation for life; education is life itself.",
    author: "John Dewey"
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "It is never too late to be what you might have been.",
    author: "George Eliot"
  },
  {
    text: "The journey of a thousand miles begins with a single step.",
    author: "Lao Tzu"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
    author: "Helen Keller"
  },
  {
    text: "What lies behind us and what lies before us are small matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama"
  },
  {
    text: "The best way to predict your future is to create it.",
    author: "Peter Drucker"
  },
  {
    text: "Do not wait to strike till the iron is hot, but make it hot by striking.",
    author: "William Butler Yeats"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  }
];

export const getRandomQuote = () => {
  const now = new Date();
  const threeHours = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
  const lastUpdateTimestamp = localStorage.getItem('lastQuoteUpdate');
  const savedQuote = localStorage.getItem('dailyQuote');

  if (lastUpdateTimestamp && savedQuote) {
    const timeDiff = now.getTime() - parseInt(lastUpdateTimestamp, 10);
    if (timeDiff < threeHours) {
      return JSON.parse(savedQuote);
    }
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  localStorage.setItem('dailyQuote', JSON.stringify(randomQuote));
  localStorage.setItem('lastQuoteUpdate', now.getTime().toString());
  return randomQuote;
};
