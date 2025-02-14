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
  }
];

export const getRandomQuote = () => {
  const today = new Date().toDateString();
  const savedQuote = localStorage.getItem('dailyQuote');
  const savedDate = localStorage.getItem('quoteDate');

  if (savedQuote && savedDate === today) {
    return JSON.parse(savedQuote);
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  localStorage.setItem('dailyQuote', JSON.stringify(randomQuote));
  localStorage.setItem('quoteDate', today);
  return randomQuote;
};
