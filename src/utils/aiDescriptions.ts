const aiDescriptions = {
  "KAN/HIN": [
    "A deep dive into Kannada or Hindi literature and grammar.",
    "Exploring the rich cultural heritage of Karnataka or India through its language.",
    "Enhancing your Kannada or Hindi communication skills."
  ],
  "VAC": [
    "Understanding the importance of Value Added Courses.",
    "Exploring various VAC options and their benefits.",
    "Developing skills that complement your core subjects."
  ],
  "DS-IN": [
    "An introduction to Data Structures and their implementation.",
    "Learning about arrays, linked lists, and trees.",
    "Building a strong foundation in data organization."
  ],
  "RP-ARP": [
    "Delving into the world of R Programming.",
    "Learning how to use R for data analysis and visualization.",
    "Developing skills in statistical computing with R."
  ],
  "OS-SP": [
    "Exploring the fundamentals of Operating Systems.",
    "Understanding process management and memory allocation.",
    "Gaining insights into the inner workings of computer systems."
  ],
  "Eng-RK": [
    "Improving your English communication skills.",
    "Focusing on grammar, vocabulary, and writing.",
    "Enhancing your ability to express yourself effectively."
  ],
  "IC": [
    "Understanding the principles of Indian Constitution.",
    "Learning about the rights and responsibilities of citizens.",
    "Developing a strong understanding of the Indian political system."
  ],
  "DS-Lab-IN": [
    "Hands-on experience with Data Structures in the lab.",
    "Writing code to implement and test various data structures.",
    "Applying data structure concepts to solve practical problems."
  ],
  "RP-Lab-ARP": [
    "Practical application of R Programming in the lab.",
    "Writing R code for data analysis and visualization.",
    "Applying R programming skills to real-world datasets."
  ],
  "30M-B/LET-OFF After-2:00": [
    "30 Minutes Break, Classes Let Off After 2:00 PM. Enjoy your weekend!",
    "30 Minutes Break, Classes Let Off After 2:00 PM. Time to relax and recharge for the next week.",
    "30 Minutes Break, Classes Let Off After 2:00 PM. Have a great weekend!"
  ]
};

export const getAiGeneratedDescription = (subject: string): string => {
  const descriptions = aiDescriptions[subject];
  if (descriptions) {
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  } else {
    return "AI-generated description coming soon...";
  }
};
