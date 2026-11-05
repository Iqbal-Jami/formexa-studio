// All copy comes from formexastudio.com (WordPress version), lightly tightened.
export const site = {
  name: 'Formexa Studio',
  tagline: 'Building brands that matter',
  email: 'hello@formexastudio.com', // TODO: confirm real inbox
  location: 'Exeter, UK',
  hours: 'Monday – Friday, 8 am – 4 pm',
  weddingUrl: 'https://wedding.formexastudio.com/',
  social: [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
};

export const nav = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const verbs = ['Build better.', 'Get found.', 'Convert more.', 'Work smarter.'];

export const pillars = [
  { title: 'Digital Presence', kind: 'web' },
  { title: 'Search Visibility', kind: 'seo' },
  { title: 'Conversion', kind: 'grow' },
  { title: 'Automation', kind: 'auto' },
];

export const ticker = [
  'Smart Development',
  'Creative Solutions',
  'Faster Performance',
  'AI Automation',
  'Digital Strategy',
  'Conversion Focus',
  'Premium Design',
  'SEO Growth',
];

export const solutions = [
  {
    title: 'Website Design & Development',
    line: 'Your digital presence, built around your business.',
    tags: ['Website Design', 'Web Development', 'E-commerce', 'Maintenance & Optimization'],
    kind: 'web',
    theme: 'paper',
  },
  {
    title: 'SEO & Search Visibility',
    line: 'Get discovered when your customers are looking.',
    tags: ['Technical SEO', 'Local SEO', 'Content & Keywords', 'Search Optimization'],
    kind: 'seo',
    theme: 'butter',
  },
  {
    title: 'Marketing & Growth',
    line: 'Turn attention into meaningful growth.',
    tags: ['Digital Marketing', 'Paid Campaigns', 'Content Strategy', 'Conversion Optimization'],
    kind: 'grow',
    theme: 'lilac',
  },
  {
    title: 'Business Process Automation',
    line: 'Let your business work smarter.',
    tags: ['Workflow Automation', 'Lead Automation', 'AI Integrations', 'Business Systems'],
    kind: 'auto',
    theme: 'ink',
  },
];

// "Why Formexa" stacked cards (look taken from the old site's solutions block).
// Add or remove items freely; the stacking effect works for any count.
// Optional `image: '/images/xyz.jpg'` (file in public/images) replaces the illustration.
export const promise = {
  eyebrow: 'Why Formexa',
  title: 'Built to keep working',
  titleOutline: 'long after launch.',
  items: [
    {
      title: 'Strategy before pixels',
      line: 'We start with your goals, not a template.',
      tags: ['Goal setting', 'Audience research', 'Competitor review', 'Clear roadmap'],
      kind: 'seo',
      theme: 'lilac',
    },
    {
      title: 'Design that earns enquiries',
      line: 'Every page has one job: the next step.',
      tags: ['Conversion layouts', 'Brand consistency', 'Mobile first', 'Accessible design'],
      kind: 'web',
      theme: 'butter',
    },
    {
      title: 'Fast, secure, easy to edit',
      line: 'Quick for visitors, simple for you.',
      tags: ['Fast loading', 'Secure hosting', 'Easy editing', 'Regular backups'],
      kind: 'auto',
      theme: 'cobalt',
    },
    {
      title: 'A partner after launch',
      line: 'Reports, care and a team on your side.',
      tags: ['Monthly reports', 'Care plans', 'Priority support', 'Growth reviews'],
      kind: 'grow',
      theme: 'ink',
    },
  ],
};

// Industries list (copy from the "Built for businesses like yours." design).
export const industriesListIntro = {
  label: "— Industries",
  title: "Built for businesses",
  titleMuted: "like yours.",
  text: "We work in five niches, deeply. Each one has its own portfolio, its own pricing instincts, and its own idea of what \"launch day\" looks like. Pick the one that fits.",
  cta: "View work",
};

export const industriesList = [
  { name: "Wedding Businesses", tag: "Our niche", href: "https://wedding.formexastudio.com/" },
  { name: "Photographers & Creatives", tag: "Portfolio-led", href: "#contact" },
  { name: "Lifestyle & Local Business", tag: "Local SEO", href: "#contact" },
  { name: "Aesthetic & Beauty", tag: "Booking-first", href: "#contact" },
  { name: "Dental & Healthcare Practices", tag: "Compliance-aware", href: "#contact" },
];

export const industries = [
  {
    name: 'Wedding Businesses',
    who: 'Wedding planners, bridal hair and makeup artists, photographers and videographers.',
    line: 'Clear, beautiful digital experiences designed around couples, trust and connection.',
    href: 'https://wedding.formexastudio.com/',
    cta: 'Visit Wedding Formexa',
    color: '#FFE066',
  },
  {
    name: 'Photographers & Creatives',
    who: 'Photographers, videographers, creative studios and content creators.',
    line: 'Your work deserves more than a gallery. We build visual-first sites that show your craft and turn attention into enquiries.',
    href: '#contact',
    cta: 'Build my portfolio',
    color: '#BDBAFF',
  },
  {
    name: 'Lifestyle & Local Businesses',
    who: 'Boutiques, cafés, bakeries, interiors, wellness and hospitality.',
    line: 'Whether you sell a product, an experience or a craft, we help your business stand out and make the next step obvious.',
    href: '#contact',
    cta: 'Build my presence',
    color: '#FF9EC4',
  },
  {
    name: 'Aesthetic & Beauty',
    who: 'Aesthetic clinics, med spas, skin clinics, beauty studios and salons.',
    line: 'Build trust, show your expertise and make the journey from discovery to booking easier.',
    href: '#contact',
    cta: 'Build my presence',
    color: '#9FF0D0',
  },
  {
    name: 'Dental & Healthcare Practices',
    who: 'Dental studios, cosmetic dentists, smile clinics and private practices.',
    line: 'Clear, professional experiences designed around patients, trust and accessibility.',
    href: '#contact',
    cta: "Build my practice's presence",
    color: '#FFFFFF',
  },
];

export const process = [
  {
    title: 'Discovery',
    points: ['Client consultation', 'Identify bottlenecks', 'Project objectives', 'Define goals'],
  },
  {
    title: 'Planning',
    points: ['Scope definition', 'Wireframing', 'Content strategy', 'Technology stack', 'Resource allocation'],
  },
  {
    title: 'Design',
    points: ['Produce wireframes', 'Optimize interface', 'Responsive design', 'Map experiences'],
  },
  {
    title: 'Development & Growth',
    points: ['Project setup', 'Implement SEO', 'Deploy automation'],
  },
  {
    title: 'Launch & Support',
    points: ['Validate performance', 'Quality assurance', 'Client handover', 'Maintain operations'],
  },
];

export const work = [
  { name: 'Edvice Global', href: 'https://formexastudio.com/portfolio/makeup-artists/', hue: ['#2B2BFF', '#BDBAFF'] },
  { name: 'Precision Painting Plus', href: 'https://formexastudio.com/portfolio/wedding-photography/', hue: ['#FFE066', '#FF9EC4'] },
  { name: 'High Rocks', href: 'https://formexastudio.com/portfolio', hue: ['#0D0D2B', '#9FF0D0'] },
];

export const plans = [
  {
    name: 'Starter',
    blurb: 'Everything you need to build a professional online presence and start with confidence.',
    price: 200,
    features: [
      '1–3 page custom website design',
      'Mobile responsive design',
      'Basic UI/UX layout (Figma)',
      'Basic SEO setup',
      'Delivery in 5–7 days',
      '24/7 support',
    ],
  },
  {
    name: 'Growth',
    blurb: "For businesses ready to grow with a website that's built to attract, convert and stand out.",
    price: 500,
    featured: true,
    features: [
      '5–8 page custom website design',
      'Interactive elements & animations',
      'Advanced UI/UX design system',
      'On-page SEO optimization',
      '3 revision rounds',
      'Delivery in 7–12 days',
    ],
  },
  {
    name: 'Premium',
    blurb: 'Our most complete package for businesses ready to invest in long-term digital growth.',
    price: 1000,
    features: [
      '20+ page custom website design',
      'Advanced animations & interactions',
      'Full SEO + performance optimization',
      'Fast-track delivery (10–15 days)',
      'Dedicated support & consultation',
    ],
  },
];

export const faqs = [
  {
    q: 'How long does a website project take?',
    a: 'Most projects are completed within 3–6 weeks, depending on the scope and how quickly content is ready.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: "Absolutely. We'll transform your current website into something that better reflects your business and supports your goals.",
  },
  {
    q: 'Will I be able to update my website myself?',
    a: "Yes. We set up every site so you can make updates easily whenever you need to.",
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes. We offer website care, maintenance, updates and ongoing support after your website goes live.',
  },
  {
    q: 'How do we get started?',
    a: "Simply get in touch, tell us about your business, and we'll guide you through the next steps.",
  },
];

// Text marquees. Words come from the original site.
export const marqueeWords = ['Design', 'Develop', 'Marketing'];
export const marqueePhrases = [
  'Premium Design',
  'Smart Development',
  'SEO Growth',
  'AI Automation',
  'Digital Strategy',
  'Conversion Focus',
];
