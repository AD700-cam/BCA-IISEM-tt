const aiDescriptions: Record<string, string[]> = {
  // ── Web Technology ──────────────────────────────────────────────────────────
  "WT – ARV": [
    "ARV diving into the world of web tech. HTML, CSS, JS — the trinity of the modern web!",
    "ARV's session on responsive design and web standards. Let's build something beautiful.",
    "From static pages to dynamic apps with ARV. The web never stops evolving!",
    "HTTP, servers, and client-side magic — ARV makes it crystal clear.",
    "Crafting seamless user experiences with ARV. Web tech is where ideas come alive!"
  ],

  // ── Web Technology Lab ───────────────────────────────────────────────────────
  "WT Lab – ARV": [
    "ARV's WT Lab: Hands-on web building time. Fire up the editor and let's code!",
    "Practical web tech with ARV — your portfolio grows one lab at a time.",
    "Debugging layouts and scripts under ARV's guidance. Trial, error, and triumph!",
    "Building responsive pages from scratch with ARV. The web is your canvas.",
    "Live coding, live feedback — ARV's lab is where theory becomes a real product."
  ],

  // ── Software Engineering ─────────────────────────────────────────────────────
  "SE – SR": [
    "SR walking us through software life-cycles. Engineering great products starts here.",
    "Requirements, design, testing — SR covers the full SE spectrum today.",
    "Agile, Scrum, and beyond with SR. The principles that ship real software.",
    "SR on software architecture and design patterns. Building for scale!",
    "Quality assurance and project management insights from SR. Let's engineer right."
  ],

  // ── Emerging Technology & Programming / ETP ──────────────────────────────────
  "ETP – RK": [
    "RK exploring emerging tech trends. The future is being written today!",
    "Cutting-edge programming paradigms with RK. Stay ahead of the curve.",
    "RK on new-age tools and technologies shaping the industry. Exciting stuff!",
    "Innovation and disruption — RK helps us understand what's coming next.",
    "From cloud-native to AI-assisted dev — RK's ETP session is full of gems."
  ],

  // ── Discrete Mathematics ─────────────────────────────────────────────────────
  "DM – ARP": [
    "ARP unlocking the logic of Discrete Maths. Sets, graphs, and proofs await!",
    "Combinatorics and graph theory with ARP — the math that powers CS.",
    "ARP making Boolean algebra and logic gates feel intuitive. Let's reason!",
    "Discrete structures with ARP: the backbone of algorithms and data structures.",
    "Proofs, relations, and functions — ARP's DM class is where rigor meets creativity."
  ],

  // ── Discrete Mathematics Lab ─────────────────────────────────────────────────
  "DM Lab – ARP": [
    "ARP's DM Lab: Applying discrete math concepts hands-on. Logic in action!",
    "Implementing graph algorithms and proofs with ARP. Theory meets code.",
    "Boolean expressions and truth tables — ARP's lab makes it concrete.",
    "Solving combinatorial problems with code under ARP's expert eye.",
    "From sets to algorithms: ARP's lab bridges the gap between math and programs."
  ],

  // ── Information Security ─────────────────────────────────────────────────────
  "IS – SR": [
    "SR on information security — because every system needs to be defended!",
    "Cryptography and network security essentials with SR. Stay safe, stay smart.",
    "SR breaking down authentication, authorisation, and attack vectors. Critical stuff!",
    "Firewalls, encryption, and ethical hacking basics with SR. Let's secure the web.",
    "Understanding threats and countermeasures with SR. Security is everyone's job."
  ],

  // ── Data Analytics Lab ───────────────────────────────────────────────────────
  "DA Lab – KSN": [
    "KSN's DA Lab: Turning raw data into actionable insights. Let the analysis begin!",
    "Visualisations, statistics, and storytelling with data under KSN's guidance.",
    "Hands-on analytics with KSN — dashboards, trends, and predictions.",
    "From data wrangling to insight generation: KSN's lab covers it all.",
    "Mastering analytical tools with KSN. Data is only as good as its analysis!"
  ],

  // ── Library ──────────────────────────────────────────────────────────────────
  "LIB": [
    "Library hour — the perfect time to explore books, journals, and resources.",
    "Hit the shelves! Research, read, or catch up on references in the library.",
    "Quiet study time in the library. Focus, absorb, and grow your knowledge.",
    "A great slot to deep-dive into a topic you're curious about. Happy reading!",
    "Library session: your gateway to a world of curated knowledge."
  ],

  // ── Sports ───────────────────────────────────────────────────────────────────
  "Sports": [
    "Time to hit the field! Let's build endurance and teamwork together.",
    "The essential sports break: Recharging body and mind. See you on the court!",
    "Leadership and resilience through play. A well-deserved break.",
    "Fresh air and movement. The best way to reset for the next lecture.",
    "Camaraderie and competition. Let's make the most of our field time!"
  ],

  // ── Breaks ───────────────────────────────────────────────────────────────────
  "Break": [
    "Quick reset! Coffee, snacks, or just a quick stretch. You've earned it.",
    "Step away from the desk. Clear your head for the next deep dive.",
    "Catch up with friends! The best interval for a quick social boost.",
    "Take a walk, breathe, and reset. Almost halfway through the day!",
    "A perfect moment to refuel. Let's keep the energy high."
  ],
  "Lunch Break": [
    "Food time! Enjoy your meal and take a serious break from the books.",
    "Social hour over good food. Recharging for the afternoon stretch.",
    "The mid-day reset: Nutrition, hydration, and relaxation. Let's refuel!",
    "Step outside, eat something great, and enjoy the sun. Recharge complete.",
    "A time for nourishment and connection before the afternoon sessions begin."
  ],

  // ── Free / Empty slots ───────────────────────────────────────────────────────
  "—": [
    "A free slot! Time for deep self-study or just a solid rest. You choose.",
    "No lecture scheduled. Perfect time to hit the library or finish that lab.",
    "Zero hour: Catch up on assignments or explore something new on your own.",
    "A gap in the day. Use it wisely, or just relax and recharge!",
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
