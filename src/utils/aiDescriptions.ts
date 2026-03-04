const aiDescriptions: Record<string, string[]> = {
  "ENG - AK": [
    "Exploring the nuances of lit and language with AK. Let's sharpen those comms skills!",
    "AK's session: A deep dive into expression and modern literature. Time to get creative.",
    "Refining our professional voice with AK. Communication is key for Section D!",
    "AK always brings a fresh perspective to classics. Ready for some discussion?",
    "Polishing our grammar and vocabulary in AK's class. Let's make every word count."
  ],
  "CN - BL": [
    "BL breaking down the backbone of the internet. Networking is where the magic happens!",
    "Understanding the protocols that connect the world with BL. Let's get technical.",
    "Data routing and network security with BL. Section D, prepare for deep packet inspection!",
    "OSI models and real-world scenarios in BL's session. The foundation of our digital world.",
    "Mastering high-speed communication with BL. Let's stay connected."
  ],
  "PYT - LAB - ARP": [
    "ARP's lab: Where code comes to life. Let's build something awesome in Python!",
    "Hands-on with data structures and scripts in ARP's session. Ready to debug?",
    "Pythonic thinking with ARP. Practicing algorithms and logic, one script at a time.",
    "Deployment and optimization with ARP. Let's make our Python code bulletproof.",
    "From theory to reality—ARP's lab is all about execution. Python power!"
  ],
  "AI - ABJ": [
    "AI with ABJ: Deciphering the algorithms of the future. Let's think smart!",
    "Neural networks and intelligent agents with ABJ. Exploring the frontiers of logic.",
    "ABJ's session on ethics and the future of AI. Where technology meets philosophy.",
    "Learning to build adaptive models with ABJ. The next gen of computing starts here.",
    "ABJ breaking down machine learning. Let's train our brains along with the models!"
  ],
  "AIA - ABJ": [
    "Advanced AI with ABJ: Diving into the complex stuff. Ready for a challenge?",
    "Cognitive models and advanced search depth with ABJ. Taking it to the next level.",
    "Integration and industrial AI with ABJ. How we build for the real world.",
    "Robotics and autonomous systems trends with ABJ. The future is looking bright.",
    "Mastering the math and logic behind state-of-the-art AI. Let's dive deep."
  ],
  "CMV-2 - PN": [
    "Math meets logic in PN's session. Cracking computational problems together!",
    "PN's class: Numerical analysis and modeling. The rigor behind the high-performance stuff.",
    "Solving engineering challenges with PN. Math is the secret weapon of Section D.",
    "High-performance algorithms and mathematical modeling with PN. Let's get precise.",
    "Building our computational foundations with PN. Logic and math combined."
  ],
  "ENG - RK": [
    "English with RK: Mastering the art of persuasion and public speaking. Let's talk!",
    "RK's session: Corporate comms and global perspectives. Ready for a presentation?",
    "Analytical writing and comprehension with RK. Let's sharpen those editorial eyes.",
    "Diverse literary works and effective storytelling with RK. Every story matters.",
    "RK helping us refine our global voice. Section D, communication is our strength!"
  ],
  "KAN": [
    "The beauty of Kannada literature. A moment to connect with our linguistic roots.",
    "Kannada session: Poetry, prose, and rich cultural nuances. Let's dive in.",
    "Enhancing our communication and understanding of classical Kannada literature.",
    "Mastering the script and history of Kannada. Respect the roots!",
    "Exploring modern Kannada prose. Developing a well-rounded linguistic perspective."
  ],
  "PYT - ARP": [
    "Python theory with ARP: Understanding the logic behind the libraries we use every day.",
    "ARP's session on software design patterns. Let's write clean, 'Pythonic' code.",
    "Data science and web dev foundations in Python with ARP. The world runs on this!",
    "Clean code philosophy and best practices in Python under ARP's guidance.",
    "Mastering core conceptual Python with ARP. Logic first, syntax second."
  ],
  "FDS - NK": [
    "Data Science with NK: Turning raw numbers into meaningful insights. Let's analyze!",
    "NK's class: Lifecycle of data and visualization. Seeing the story behind the data.",
    "NK bringing statistical modeling to life. Predictive power for Section D!",
    "Big data and industrial transformation with NK. Data is the new oil.",
    "Mastering the tools of modern data scientists in NK's engaging session."
  ],
  "AIA - LAB - ABJ": [
    "Practical AI Lab with ABJ: Implementation time! Let's get our hands dirty.",
    "ABJ's lab: Testing neural nets and decision systems. From theory to code.",
    "AI frameworks and practical tools in action with ABJ. This is where it gets real.",
    "Solving software engineering problems with AI under ABJ's expert supervision.",
    "Cutting-edge AI projects and collaboration. ABJ pushing us to innovate."
  ],
  "SPORTS": [
    "Time to hit the field! Let's build endurance and teamwork together.",
    "The essential sports break: Recharging body and mind. See you on the court!",
    "Leadership and resilience through play. A well-deserved break for Section D.",
    "Fresh air and movement. The best way to reset for the next lecture.",
    "Camaraderie and competition. Let's make the most of our field time!"
  ],
  "Break": [
    "Quick reset! Coffee, snacks, or just a quick stretch. You've earned it.",
    "Step away from the desk. Clear your head for the next deep dive.",
    "Catch up with friends! The best interval for a quick social boost.",
    "Take a walk, breathe, and reset. Almost halfway through the day!",
    "A perfect moment to refuel. Section D, let's keep the energy high."
  ],
  "Lunch Break": [
    "Food time! Enjoy your meal and take a serious break from the books.",
    "Social hour over good food. Recharging for the afternoon stretch.",
    "The mid-day reset: Nutrition, hydration, and relaxation. Let's refuel!",
    "Step outside, eat something great, and enjoy the sun. Recharge complete.",
    "A time for nourishment and connection before the afternoon labs begin."
  ],
  "No Class update the time table": [
    "A free slot! Time for deep self-study or just a solid rest. You choose.",
    "No lecture scheduled. Perfect time to hit the library or finish that lab.",
    "Zero hour: Catch up on assignments or explore something new on your own.",
    "A gap in the day. Use it wisely Section D, or just relax and recharge!",
    "Flex time: Opportunity for personal projects or mastering that new tool."
  ]
};

export const getAiGeneratedDescription = (subject: string): string => {
  const descriptions = aiDescriptions[subject];
  if (descriptions) {
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  } else {
    return "Exploring new horizons and mastering complex concepts in this session.";
  }
};
