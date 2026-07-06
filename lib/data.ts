/**
 * All marketing content lives here so copy can be edited
 * without touching component code.
 */

export type Course = {
  slug: string;
  title: string;
  icon:
    | "wordpress"
    | "copywriting"
    | "facebook"
    | "whatsapp"
    | "tiktok"
    | "freelancing";
  kicker: string;
  description: string;
  outcomes: string[];
  duration: string;
  level: string;
};

export const courses: Course[] = [
  {
    slug: "wordpress-website-design",
    title: "WordPress Website Design",
    icon: "wordpress",
    kicker: "Build & launch",
    description:
      "Design, build and launch professional websites clients happily pay for — no code required.",
    outcomes: [
      "Build client-ready sites from a blank canvas",
      "Master themes, Elementor & custom layouts",
      "Handle domains, hosting & going live",
      "Speed, security & on-page SEO essentials",
    ],
    duration: "6 weeks",
    level: "Beginner friendly",
  },
  {
    slug: "copywriting",
    title: "Copywriting",
    icon: "copywriting",
    kicker: "Words that sell",
    description:
      "Learn to write persuasive copy that turns readers into buyers — for pages, ads and emails.",
    outcomes: [
      "Persuasion frameworks: AIDA, PAS & more",
      "Sales pages & email sequences that convert",
      "Hooks, headlines & storytelling",
      "Land your first paying copy clients",
    ],
    duration: "5 weeks",
    level: "Beginner friendly",
  },
  {
    slug: "facebook-ads",
    title: "Facebook Ads",
    icon: "facebook",
    kicker: "Paid traffic",
    description:
      "Run profitable ad campaigns from scratch — targeting, creatives, budgets and scaling.",
    outcomes: [
      "Campaign structure that actually converts",
      "Laser-focused audience targeting",
      "Ad creatives & copy people click",
      "Read metrics, cut waste, scale winners",
    ],
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    slug: "whatsapp-marketing",
    title: "WhatsApp Marketing",
    icon: "whatsapp",
    kicker: "Sell in the chat",
    description:
      "Turn your contact list into a sales channel with broadcasts, status selling and automation.",
    outcomes: [
      "Grow an audience that's ready to buy",
      "Broadcasts, catalogs & WhatsApp Business",
      "Status strategies that quietly sell",
      "Close deals in the chat with confidence",
    ],
    duration: "4 weeks",
    level: "Beginner friendly",
  },
  {
    slug: "tiktok-marketing",
    title: "TikTok Marketing",
    icon: "tiktok",
    kicker: "Organic reach",
    description:
      "Crack the algorithm, grow an audience fast and turn short-form attention into income.",
    outcomes: [
      "Hooks & content strategy that gets views",
      "Understand the algorithm — post smarter",
      "Grow followers consistently, not by luck",
      "Monetize: brand deals, traffic & sales",
    ],
    duration: "5 weeks",
    level: "Beginner friendly",
  },
  {
    slug: "freelancing",
    title: "Freelancing",
    icon: "freelancing",
    kicker: "Get paid globally",
    description:
      "Package your skills, win clients on global platforms and build a reliable freelance income.",
    outcomes: [
      "Profiles that win jobs on Upwork & Fiverr",
      "Pricing, proposals & positioning",
      "Client communication & delivery systems",
      "From first gig to recurring income",
    ],
    duration: "4 weeks",
    level: "All levels",
  },
];

export const reasons = [
  {
    number: "01",
    title: "Learn by building, not watching",
    body: "Every module ends with a real deliverable — a live website, a published ad campaign, a portfolio piece. You graduate with proof, not just notes.",
  },
  {
    number: "02",
    title: "Mentors who answer",
    body: "Weekly live sessions and an active community mean you're never stuck for long. Ask a question in the morning, apply the answer by evening.",
  },
  {
    number: "03",
    title: "Skills chosen for income",
    body: "We only teach what clients actually pay for right now. The curriculum is rebuilt every quarter around real market demand — nothing academic, nothing outdated.",
  },
  {
    number: "04",
    title: "A certificate backed by a portfolio",
    body: "Finish with an Apex certificate and a portfolio of real work — the combination that gets replies from clients and employers.",
  },
];

export const journey = [
  {
    step: "01",
    title: "Enroll & get oriented",
    body: "Pick your course, meet your cohort and set your income goal. Your roadmap is ready on day one.",
  },
  {
    step: "02",
    title: "Learn & practice live",
    body: "Short, focused lessons paired with weekly live sessions. Practice immediately — feedback comes fast.",
  },
  {
    step: "03",
    title: "Build your portfolio",
    body: "Work on real briefs, not toy exercises. Ship projects you can proudly show a paying client.",
  },
  {
    step: "04",
    title: "Get hired & earn",
    body: "Graduate into our freelance launchpad: profile reviews, proposal templates and your first client roadmap.",
  },
];

export const testimonials = [
  {
    quote:
      "Three months after the WordPress course I closed my first ₵4,000 client. The portfolio projects we built in class were literally what convinced them.",
    name: "Kwame Mensah",
    role: "Freelance Web Designer, Accra",
    course: "WordPress Website Design",
  },
  {
    quote:
      "I ran my first Facebook ad campaign for my mum's shop as a class project. It tripled her weekly orders — she still thinks I'm a wizard.",
    name: "Amara Okafor",
    role: "Media Buyer, Lagos",
    course: "Facebook Ads",
  },
  {
    quote:
      "The copywriting course paid for itself with one client. I went from writing for free to charging properly, because I finally understood why the words work.",
    name: "Fatima Bello",
    role: "Conversion Copywriter",
    course: "Copywriting",
  },
  {
    quote:
      "I thought WhatsApp was just for chatting. Now my status is a storefront — I've sold more in six weeks than the previous six months.",
    name: "Grace Adeyemi",
    role: "E-commerce Founder",
    course: "WhatsApp Marketing",
  },
  {
    quote:
      "From 200 followers to 40k in four months, and my first brand deal. The hooks framework alone was worth the fee.",
    name: "Daniel Osei",
    role: "Content Creator",
    course: "TikTok Marketing",
  },
  {
    quote:
      "The freelancing course fixed my Upwork profile in week one. By week four I had two contracts. It's a system, and it works.",
    name: "Samuel Ansah",
    role: "Freelance Marketer",
    course: "Freelancing",
  },
];

export const stats = [
  { value: 4200, suffix: "+", label: "Students trained" },
  { value: 15, suffix: "+", label: "Countries represented" },
  { value: 87, suffix: "%", label: "Earning within 90 days" },
  { value: 4.9, suffix: "/5", label: "Average student rating", decimals: 1 },
];

export const faqs = [
  {
    question: "I'm a complete beginner. Can I still join?",
    answer:
      "Absolutely — most Apex students start from zero. Every course begins with fundamentals and moves step by step. If you can use a smartphone or laptop, you can learn these skills.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "A smartphone and a stable internet connection are enough to start. A laptop helps for the WordPress and Freelancing tracks, but many students complete their first projects on mobile.",
  },
  {
    question: "Are classes live or self-paced?",
    answer:
      "Both. Core lessons are recorded so you learn on your schedule, and every week there's a live session with your mentor for feedback, Q&A and accountability.",
  },
  {
    question: "Do I get a certificate?",
    answer:
      "Yes — every graduate receives a verifiable Apex Academy certificate. More importantly, you finish with a portfolio of real projects, which is what clients actually ask for.",
  },
  {
    question: "Will you help me find clients or a job?",
    answer:
      "Our Freelance Launchpad is built into every course: profile reviews, proposal templates, pricing guidance and a first-client roadmap. Graduates also get priority access to gigs shared in our community.",
  },
  {
    question: "Can I pay in installments?",
    answer:
      "Yes. Every course offers a two-part payment plan, and we run scholarship spots each cohort. Message us on WhatsApp and we'll find an option that works for you.",
  },
];
