const aiDescriptions = {
  "KAN/HIN": [
    "A deep dive into Kannada or Hindi language and literature.",
    "Exploring the rich cultural heritage of Karnataka or India through its language.",
    "Enhancing your Kannada or Hindi communication skills.",
    "Unlocking the beauty of Kannada or Hindi poetry and prose.",
    "Discovering the history and evolution of the Kannada or Hindi script.",
    "Mastering Kannada or Hindi grammar and vocabulary."
  ],
  "ENG - RK": [
    "English class with Professor RK.",
    "Improving your English communication skills with RK.",
    "Focusing on grammar, vocabulary, and writing with RK.",
    "Enhancing your ability to express yourself effectively in English with RK.",
    "Developing your reading and comprehension skills with RK.",
    "Practicing spoken English and presentation skills with RK."
  ],
  "Break": [
    "Time to relax and recharge!",
    "Take a break and stretch your legs.",
    "Grab a snack and socialize with your classmates.",
    "Step away from your studies and clear your mind.",
    "Enjoy a few minutes of downtime before the next class.",
    "Use this time to catch up on emails or messages."
  ],
  "DS - IN": [
    "Data Structures with Instructor IN.",
    "Learning about arrays, linked lists, and trees with IN.",
    "Building a strong foundation in data organization with IN.",
    "Exploring different data structure algorithms with IN.",
    "Implementing data structures in code with IN.",
    "Analyzing the time and space complexity of data structures with IN."
  ],
  "OS - SP": [
    "Operating Systems with Professor SP.",
    "Exploring the fundamentals of Operating Systems with SP.",
    "Understanding process management and memory allocation with SP.",
    "Gaining insights into the inner workings of computer systems with SP.",
    "Learning about file systems and I/O management with SP.",
    "Studying operating system security and protection mechanisms with SP."
  ],
  "Lunch Break": [
    "Time for lunch!",
    "Enjoy a delicious and nutritious meal.",
    "Take a break from studying and socialize with friends.",
    "Recharge your energy levels for the afternoon classes.",
    "Explore the culinary options available on campus.",
    "Make sure to stay hydrated!"
  ],
  "RP - ARP": [
    "Research Project with Professor ARP.",
    "Delving into the world of research methodologies with ARP.",
    "Learning how to formulate research questions and design experiments with ARP.",
    "Developing critical thinking and analytical skills with ARP.",
    "Exploring different research methods and techniques with ARP.",
    "Preparing for your final year research project with ARP."
  ],
  "VAC": [
    "Understanding the importance of Value Added Courses.",
    "Exploring various VAC options and their benefits.",
    "Developing skills that complement your core subjects.",
    "Enhancing your employability and career prospects.",
    "Gaining practical experience in a specific field.",
    "Networking with industry professionals."
  ],
  "SPORTS": [
    "Time for physical activities and sports!",
    "Get some exercise and fresh air.",
    "Participate in team sports and build camaraderie.",
    "Improve your physical fitness and well-being.",
    "Take a break from academic work and have some fun.",
    "Develop your teamwork and leadership skills."
  ],
  "IC - PK": [
    "Indian Constitution with Professor PK.",
    "Understanding the principles of the Indian Constitution with PK.",
    "Learning about the rights and responsibilities of citizens with PK.",
    "Developing a strong understanding of the Indian political system with PK.",
    "Exploring the history and evolution of the Indian Constitution with PK.",
    "Analyzing landmark cases and constitutional amendments with PK."
  ],
  "DS - LAB - IN": [
    "Hands-on experience with Data Structures in the lab with IN.",
    "Writing code to implement and test various data structures with IN.",
    "Applying data structure concepts to solve practical problems with IN.",
    "Debugging and optimizing data structure implementations with IN.",
    "Working with different data structure libraries and frameworks with IN.",
    "Developing your problem-solving and coding skills with IN."
  ],
  "-": [
    "No class scheduled.",
    "Enjoy your free time!",
    "Use this time to catch up on assignments.",
    "Prepare for upcoming exams.",
    "Relax and recharge.",
    "Explore your interests and hobbies."
  ],
  "30M-B/LET-OFF After-2:00": [
    "30 Minutes Break, Classes Let Off After 2:00 PM. Enjoy your weekend!",
    "30 Minutes Break, Classes Let Off After 2:00 PM. Time to relax and recharge for the next week.",
    "30 Minutes Break, Classes Let Off After 2:00 PM. Have a great weekend!",
    "30 Minutes Break, Classes Let Off After 2:00 PM. Catch up with friends and family.",
    "30 Minutes Break, Classes Let Off After 2:00 PM. Plan your weekend activities.",
    "30 Minutes Break, Classes Let Off After 2:00 PM. Get ready for a well-deserved break!"
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
