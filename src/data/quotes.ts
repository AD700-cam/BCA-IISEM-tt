export const quotes = [
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text: "The hard days are what make you stronger.",
    author: "Aly Raisman"
  },
  {
    text: "Doubt kills more dreams than failure ever will.",
    author: "Suzy Kassem"
  },
  {
    text: "Excellence is not a skill, it is an attitude.",
    author: "Ralph Marston"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    text: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln"
  },
  {
    text: "Work hard in silence, let your success be your noise.",
    author: "Frank Ocean"
  },
  {
    text: "Don't decrease the goal. Increase the effort.",
    author: "Grant Cardone"
  },
  {
    text: "Action is the foundational key to all success.",
    author: "Pablo Picasso"
  },
  {
    text: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.",
    author: "Vince Lombardi"
  },
  {
    text: "It's not about perfect. It's about effort.",
    author: "Jillian Michaels"
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Anonymous"
  },
  {
    text: "Dream big, work hard, stay focused.",
    author: "Unknown"
  },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "David Goggins"
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss"
  },
  {
    text: "Consistency is more important than perfection.",
    author: "Unknown"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Intelligence without ambition is a bird without wings.",
    author: "Salvador Dali"
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe"
  },
  {
    text: "Knowledge is power. Information is liberating.",
    author: "Kofi Annan"
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes"
  },
  {
    text: "Be so good they can't ignore you.",
    author: "Steve Martin"
  },
  {
    text: "A ship in harbor is safe, but that is not what ships are built for.",
    author: "John A. Shedd"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "Do something today that your future self will thank you for.",
    author: "Unknown"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    text: "The question isn't who is going to let me; it's who is going to stop me.",
    author: "Ayn Rand"
  },
  {
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill"
  },
  {
    text: "The only place where success comes before work is in the dictionary.",
    author: "Vidal Sassoon"
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
