/**
 * All page content lives here so copy and pricing can be updated
 * without touching component code.
 */

export type Service = {
  slug: string;
  title: string;
  range: string;
  description: string;
  items: string[];
  note?: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "home-cleaning",
    title: "Home Cleaning",
    range: "₦40,000 – ₦100,000",
    description:
      "A deep, detail-first clean for apartments and family homes — every surface, corner and fitting brought back to pristine.",
    items: [
      "Self contain",
      "One bedroom",
      "Two bedroom",
      "Three bedroom",
      "Four bedroom",
      "Five bedroom",
    ],
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    range: "₦50,000 – ₦150,000",
    description:
      "Spotless, presentation-ready spaces for businesses — from daily offices to handovers and post-construction sites.",
    items: ["Offices", "Move in", "Move out", "Events", "Post construction"],
  },
  {
    slug: "executive-housekeeping",
    title: "Executive Housekeeping",
    range: "₦50,000 – ₦200,000",
    description:
      "A recurring housekeeping plan with a dedicated team, so your home simply stays perfect — without you thinking about it.",
    items: ["Basic plan — twice every month", "Premium plan — once every week, for one month"],
    note: "Most booked",
    featured: true,
  },
];

export const trustItems = [
  "Residential cleaning",
  "Commercial cleaning",
  "Executive housekeeping",
  "Eco-friendly products",
  "Satisfaction guarantee",
] as const;

export type Feature = { title: string; body: string; icon: string };

export const features: Feature[] = [
  {
    title: "Highly trained professionals",
    body: "Vetted, uniformed and trained to hotel housekeeping standards before they ever enter your home.",
    icon: "team",
  },
  {
    title: "Modern equipment",
    body: "Professional-grade machines and microfibre systems that clean deeper than domestic tools can.",
    icon: "equipment",
  },
  {
    title: "Eco-friendly products",
    body: "Safe for children, pets and allergy-sensitive households — tough only on dirt.",
    icon: "leaf",
  },
  {
    title: "Honest pricing",
    body: "Clear ranges published upfront. Your final quote is confirmed before any work begins.",
    icon: "pricing",
  },
  {
    title: "Reliable scheduling",
    body: "We arrive when we say we will. Your time is the whole point of hiring us.",
    icon: "clock",
  },
  {
    title: "Attention to detail",
    body: "Skirting boards, switch plates, door tops — the places others skip are where we start.",
    icon: "detail",
  },
  {
    title: "Trusted by families",
    body: "Homes across Calabar and beyond trust us with their keys, their spaces and their routines.",
    icon: "home",
  },
  {
    title: "Satisfaction guaranteed",
    body: "If anything falls short of pristine, we return and make it right — at no extra cost.",
    icon: "guarantee",
  },
];

export type ProcessStep = { title: string; body: string };

export const processSteps: ProcessStep[] = [
  {
    title: "Book",
    body: "Call, WhatsApp or use the form. Tell us about your space and pick a time that suits you.",
  },
  {
    title: "Inspection",
    body: "We assess the property and condition, then confirm a precise quote — no surprises later.",
  },
  {
    title: "Professional cleaning",
    body: "A trained team arrives on schedule with equipment and eco-friendly products, and gets to work.",
  },
  {
    title: "Quality check",
    body: "A supervisor walks the space against our checklist before we consider the job done.",
  },
  {
    title: "Enjoy your space",
    body: "Step into a home or office that feels brand new — and spend your time on what matters.",
  },
];

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  review: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Arit Effiong",
    location: "State Housing Estate, Calabar",
    rating: 5,
    review:
      "They cleaned my three-bedroom before a family event and I honestly kept staring at the kitchen. Every handle, every tile. It felt like moving into a new apartment.",
  },
  {
    name: "Ubong Bassey",
    location: "Ekorinim, Calabar",
    rating: 5,
    review:
      "I travel constantly, so I'm on the premium housekeeping plan. I come home every week to a hotel-standard flat without lifting a finger. Worth every naira.",
  },
  {
    name: "Mrs. Asuquo",
    location: "Diamond Hill, Calabar",
    rating: 5,
    review:
      "Professional from the first call. They arrived on time, worked quietly and left my home smelling clean — not chemical. My children have allergies, so that matters.",
  },
  {
    name: "Idara Etim",
    location: "Marian, Calabar",
    rating: 5,
    review:
      "We used them for our office move-in after renovation. Post-construction dust everywhere — gone in a day. The team even did a walkthrough with me at the end.",
  },
  {
    name: "Emem Okon",
    location: "Federal Housing, Calabar",
    rating: 5,
    review:
      "Our office is cleaned before staff resume every Monday. Clients comment on it. It's the easiest vendor relationship I manage — they just deliver.",
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How do I book a cleaning?",
    answer:
      "Call or WhatsApp us on 0913 919 2450 or 0903 934 3495, message us on Instagram @pristinesolution.ng, or use the booking form on this page. We'll confirm your date, scope and quote the same day.",
  },
  {
    question: "Do you bring your own supplies and equipment?",
    answer:
      "Yes. Every team arrives fully equipped with professional machines, microfibre systems and eco-friendly products. You don't need to provide anything — just access to the space.",
  },
  {
    question: "How long does a cleaning take?",
    answer:
      "It depends on the size and condition of the property. A one-bedroom deep clean typically takes 3–4 hours; larger homes and post-construction jobs can take a full day. We confirm timing during inspection.",
  },
  {
    question: "Do you clean offices and commercial spaces?",
    answer:
      "Yes — offices, event venues, move-ins, move-outs and post-construction sites. We work around your business hours, including evenings and weekends, so operations are never disrupted.",
  },
  {
    question: "Do you offer recurring cleaning?",
    answer:
      "Yes. Our Executive Housekeeping plans cover recurring service: the Basic plan is twice a month, and the Premium plan is weekly. Both come with a dedicated, consistent team.",
  },
  {
    question: "Do you clean after construction or renovation?",
    answer:
      "Absolutely. Post-construction cleaning is one of our specialties — dust extraction, paint spot removal, window detailing and a full polish so the space is ready to occupy.",
  },
];

/** Pricing detail rows, presented like a hotel menu. */
export const priceList = [
  {
    group: "Home cleaning",
    rows: [
      { label: "Self contain", range: "from ₦40,000" },
      { label: "One – two bedroom", range: "₦50,000 – ₦65,000" },
      { label: "Three – four bedroom", range: "₦65,000 – ₦85,000" },
      { label: "Five bedroom", range: "₦85,000 – ₦100,000" },
    ],
  },
  {
    group: "Commercial cleaning",
    rows: [
      { label: "Offices", range: "₦50,000 – ₦100,000" },
      { label: "Move in / move out", range: "₦60,000 – ₦120,000" },
      { label: "Events", range: "₦60,000 – ₦120,000" },
      { label: "Post construction", range: "₦80,000 – ₦150,000" },
    ],
  },
  {
    group: "Executive housekeeping",
    rows: [
      { label: "Basic — twice every month", range: "₦50,000 – ₦120,000" },
      { label: "Premium — weekly, for one month", range: "₦120,000 – ₦200,000" },
    ],
  },
] as const;
