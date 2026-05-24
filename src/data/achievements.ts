import {
  Zap, Leaf, Brain, Rocket, FlaskConical,
  Trophy, Medal, GraduationCap, TrendingUp, Code2,
  Languages, ScrollText, Music, BarChart3, Link2,
  Bot, Lightbulb, GitBranch, Shield, ShieldAlert,
  Globe, BookMarked, Network,
  type LucideIcon,
} from "lucide-react";

export type PokemonType =
  | "FIRE" | "GRASS" | "WATER" | "PSYCHIC"
  | "ELECTRIC" | "GHOST" | "DRAGON" | "NORMAL";

export const typeColors: Record<PokemonType, string> = {
  FIRE: "#EE8130",
  GRASS: "#7AC74C",
  WATER: "#6390F0",
  PSYCHIC: "#F95587",
  ELECTRIC: "#F7D02C",
  GHOST: "#735797",
  DRAGON: "#6F35FC",
  NORMAL: "#A8A878",
};

export type Category = "founding" | "hackathon" | "award" | "education" | "cert" | "research";

export interface Achievement {
  id: string;
  name: string;
  org: string;
  period: string;
  category: Category;
  types: PokemonType[];
  icon: LucideIcon;
  description: string;
  detail: string;
  highlight?: string;
}

export const achievements: Achievement[] = [
  {
    id: "001",
    name: "Lumen Studio",
    org: "Co-Founder & Lead Engineer",
    period: "Oct 2023 – Present",
    category: "founding",
    types: ["FIRE", "NORMAL"],
    icon: Zap,
    description: "Product-focused tech studio building original apps — full stack, from idea to production.",
    detail:
      "A product-focused tech studio building its own apps from end to end. Lead engineering across the full product build cycle: ideation, technical planning, development, testing, release, and iteration. End-to-end across the stack — back-end services and APIs, front-end experiences, infrastructure, deployments, and performance optimisation.",
    highlight: "Co-Founder",
  },
  {
    id: "002",
    name: "CalmCampus",
    org: "Co-Founder & CTO",
    period: "Jan 2026 – Present",
    category: "founding",
    types: ["GRASS", "PSYCHIC"],
    icon: Leaf,
    description: "Privacy-first student wellbeing platform using passive behavioural signals and on-device AI.",
    detail:
      "Co-founded a privacy-first student wellbeing platform through the KU Leuven KICK Challenge, in collaboration with KU Leuven STUVO. Identifies burnout risk through passive behavioural signals and on-device AI — without individual surveillance. Lead technical development: data strategy, AI/ML approach, privacy-by-design architecture, and GDPR-conscious data handling.",
    highlight: "Co-Founder & CTO",
  },
  {
    id: "003",
    name: "NeuroMedix Hackathon",
    org: "Hackathon",
    period: "Mar 2026",
    category: "hackathon",
    types: ["ELECTRIC", "PSYCHIC"],
    icon: Brain,
    description: "Decoded EEG brain signals using ML to translate neurological data into tangible outputs.",
    detail:
      "Decoded EEG brain signals using machine learning and translated them into tangible, interpretable outputs. Reached the finals with a team of 3–4 on a sponsor-defined case at the intersection of neuroscience and AI — a deep dive into applied neurotechnology and real-time signal processing.",
    highlight: "Finalist",
  },
  {
    id: "004",
    name: "Next Level Challenge",
    org: "NEXT Leuven Hackathon",
    period: "Mar 2026",
    category: "hackathon",
    types: ["ELECTRIC"],
    icon: Rocket,
    description: "24h hackathon — built an AI investment app using the Claude API. Scored 80/100.",
    detail:
      "24-hour hackathon organised by NEXT Leuven on a real-world case by InvestSuite. Built an AI-powered investment app using the Claude API that dynamically adapts its interface and recommendations to the individual user. Scored 80/100 overall (40/50 technical, 40/50 business) — jury praised great design and strong product thinking.",
    highlight: "80/100",
  },
  {
    id: "005",
    name: "European Synbio Hackathon",
    org: "EU-wide Hackathon",
    period: "Nov 2024",
    category: "hackathon",
    types: ["ELECTRIC", "GRASS"],
    icon: FlaskConical,
    description: "EU-wide hackathon on synthetic biology — developed a biotech nutrition app.",
    detail:
      "EU-wide online hackathon focused on innovation in synthetic biology. Competed in the Agrifood & Nutrition track, developing a nutrition app leveraging biotechnology to advance sustainable food and agriculture. Pitched to a jury of academics, industry leaders, and investors.",
  },
  {
    id: "006",
    name: "Future of IT Leaders",
    org: "Editx — Data & AI Challenge",
    period: "2025",
    category: "award",
    types: ["DRAGON"],
    icon: Trophy,
    description: "Selected as one of Belgium's top 50 emerging IT leaders in the Data & AI track.",
    detail:
      "Selected as a Finalist and placed in the Top 50 of the Future of IT Leaders: Data & AI Challenge 2025, organised by Editx. This competitive programme recognises Belgium's most promising young IT talent across Data, AI, Cybersecurity, and other technical disciplines.",
    highlight: "Top 50 · Finalist",
  },
  {
    id: "007",
    name: "KICK Challenge",
    org: "KU Leuven",
    period: "2026",
    category: "award",
    types: ["DRAGON", "GRASS"],
    icon: Medal,
    description: "Selected to participate in KU Leuven's competitive entrepreneurship programme.",
    detail:
      "Selected as a participant in the KU Leuven KICK Challenge 2026 — a competitive entrepreneurship programme run by KU Leuven Research & Development. Through this programme, CalmCampus received mentorship, resources, and institutional collaboration to develop the platform further.",
    highlight: "Selected Participant",
  },
  {
    id: "008",
    name: "BASc Applied Computer Science",
    org: "UCLL University of Applied Sciences",
    period: "2024 – 2027",
    category: "education",
    types: ["WATER"],
    icon: GraduationCap,
    description: "Main degree covering software engineering, AI, and data engineering.",
    detail:
      "Bachelor of Applied Science in Applied Computer Science at UCLL University of Applied Sciences, Leuven. Main focus areas: software engineering, artificial intelligence, and data engineering. Pursued alongside active entrepreneurial work and independent research.",
  },
  {
    id: "009",
    name: "Yale Finance Program",
    org: "Yale University",
    period: "Jan 2026 – Jun 2026",
    category: "education",
    types: ["WATER"],
    icon: TrendingUp,
    description: "Non-degree finance program at Yale — financial principles, markets, and economics.",
    detail:
      "Non-degree finance program at Yale University covering financial principles, markets, and economic reasoning. Pursued alongside the main CS degree to build interdisciplinary expertise spanning technology and finance — informing work at the intersection of AI and financial systems.",
  },
  {
    id: "010",
    name: "CS50: Intro to Computer Science",
    org: "Harvard University",
    period: "Sep 2024 – Dec 2024",
    category: "education",
    types: ["WATER"],
    icon: Code2,
    description: "Harvard's legendary intro CS course — algorithms, C, Python, SQL, and web.",
    detail:
      "Harvard University's renowned introductory computer science course, covering the foundational concepts of computing: algorithms, data structures, C programming, Python, SQL, and web development. Completed as a rigorous, self-paced programme to solidify core CS fundamentals.",
    highlight: "Harvard University",
  },
  {
    id: "011",
    name: "Japanese Language Program",
    org: "KU Leuven",
    period: "Feb 2026 – Dec 2026",
    category: "education",
    types: ["WATER", "NORMAL"],
    icon: Languages,
    description: "Formal Japanese language study at KU Leuven, targeting N5 proficiency.",
    detail:
      "Formal Japanese language study at KU Leuven, working toward JLPT N5 proficiency. Motivated by research interest in Japanese-English cross-lingual NLP and a broader goal of linguistic fluency. Practical study supplemented by the Nihongo web app — a custom learning tool built alongside this programme.",
  },
  {
    id: "012",
    name: "European Baccalaureate",
    org: "European School of Luxembourg 1",
    period: "2012 – 2023",
    category: "education",
    types: ["WATER", "NORMAL"],
    icon: ScrollText,
    description: "Multilingual European Baccalaureate diploma across 11 years.",
    detail:
      "Completed the European Baccalaureate at the European School of Luxembourg 1 — a multilingual, European-curriculum secondary education programme. Attended in a trilingual environment (Dutch, French, English) from age 6 to 18, building a strong academic and cross-cultural foundation.",
  },
  {
    id: "013",
    name: "Guitar & Music Theory",
    org: "Conservatoire de la Ville de Luxembourg",
    period: "2014 – 2021",
    category: "education",
    types: ["NORMAL"],
    icon: Music,
    description: "7-year classical guitar and theory certificate from the Luxembourg Conservatoire.",
    detail:
      "Completed a 7-year classical guitar and music theory programme at the Conservatoire de la Ville de Luxembourg, earning a formal Certificate in Guitar & Music Theory. Studied classical technique, harmony, counterpoint, and music history — a discipline that shaped analytical thinking and long-term creative discipline.",
    highlight: "Certificate",
  },
  {
    id: "014",
    name: "Bloomberg Market Concepts",
    org: "Bloomberg",
    period: "2025",
    category: "cert",
    types: ["GHOST"],
    icon: BarChart3,
    description: "Industry-standard Bloomberg certification covering financial markets and economics.",
    detail:
      "Bloomberg Market Concepts (BMC) is Bloomberg's flagship financial literacy certification, covering economic indicators, currencies, fixed income, and equities. Earned as part of building a working knowledge of financial markets to complement technical AI and data work.",
    highlight: "Bloomberg Certified",
  },
  {
    id: "015",
    name: "LangChain LLM Applications",
    org: "DataCamp",
    period: "2025",
    category: "cert",
    types: ["GHOST", "PSYCHIC"],
    icon: Link2,
    description: "Certification in developing LLM-powered applications with LangChain.",
    detail:
      "Certification in developing LLM-powered applications using LangChain — covering chains, agents, memory, tools, and retrieval-augmented generation (RAG). Earned alongside active work building AI-integrated products and research experiments.",
  },
  {
    id: "016",
    name: "Deep Learning with PyTorch",
    org: "DataCamp",
    period: "2025",
    category: "cert",
    types: ["GHOST", "PSYCHIC"],
    icon: Bot,
    description: "Intermediate deep learning certification covering neural networks and PyTorch.",
    detail:
      "Intermediate Deep Learning with PyTorch certification from DataCamp — covering neural network architectures, training pipelines, CNNs, RNNs, and model evaluation. Earned as hands-on preparation for NLP research and language model fine-tuning work.",
  },
  {
    id: "017",
    name: "AI Fundamentals",
    org: "DataCamp",
    period: "2025",
    category: "cert",
    types: ["GHOST"],
    icon: Lightbulb,
    description: "Foundational AI certification covering core ML concepts and practical applications.",
    detail:
      "AI Fundamentals certification from DataCamp, covering core machine learning concepts, supervised and unsupervised learning, model evaluation, and practical AI workflows. Part of a structured path toward applied AI and ML research competency.",
  },
  {
    id: "018",
    name: "GitHub Foundations",
    org: "DataCamp",
    period: "2025",
    category: "cert",
    types: ["GHOST"],
    icon: GitBranch,
    description: "Certification in GitHub workflows, version control, and team collaboration.",
    detail:
      "GitHub Foundations certification covering version control with Git, branching strategies, pull request workflows, GitHub Actions basics, and collaborative development practices. Formalised knowledge of tooling used daily across all production projects.",
  },
  {
    id: "019",
    name: "Pre Security Certificate",
    org: "TryHackMe",
    period: "2025",
    category: "cert",
    types: ["GHOST"],
    icon: Shield,
    description: "Cybersecurity fundamentals — networking, web security, Linux, and Windows.",
    detail:
      "TryHackMe Pre Security Certificate covering the foundations of cybersecurity: networking concepts, Linux fundamentals, Windows fundamentals, and web application security. Completed as part of building security-aware engineering practice across all projects.",
  },
  {
    id: "020",
    name: "Advent of Cyber 2025",
    org: "TryHackMe",
    period: "2025",
    category: "cert",
    types: ["GHOST"],
    icon: ShieldAlert,
    description: "25-day cybersecurity challenge covering offensive and defensive security topics.",
    detail:
      "TryHackMe's Advent of Cyber 2025 — a 25-day challenge covering OSINT, web exploitation, reverse engineering, forensics, malware analysis, and defensive tools. Practical, hands-on security training through gamified CTF-style challenges.",
  },
  {
    id: "021",
    name: "IPv6 Sage Certification",
    org: "Hurricane Electric",
    period: "2025",
    category: "cert",
    types: ["GHOST"],
    icon: Globe,
    description: "Top-tier IPv6 proficiency certification — the highest level in HE's programme.",
    detail:
      "Hurricane Electric's IPv6 Sage Certification — the highest level in their IPv6 certification programme. Demonstrates comprehensive understanding of IPv6 addressing, routing, tunneling, and deployment. Earned as part of building deep networking knowledge alongside security and systems work.",
    highlight: "Sage Level",
  },
  {
    id: "022",
    name: "Cross-Lingual LLM Paper",
    org: "Independent Research",
    period: "2026",
    category: "research",
    types: ["PSYCHIC", "DRAGON"],
    icon: BookMarked,
    description: "Research paper on cross-lingual alignment and pragmatic reasoning in bilingual LLMs.",
    detail:
      "Independent research paper: \"Interpretable Cross-Lingual Alignment in Small Language Models: Probing Cultural and Pragmatic Reasoning in Japanese-English Bilingual LLMs.\" Investigates how small language models encode cross-lingual alignment, focusing on cultural and pragmatic reasoning in Japanese-English bilingual settings.",
    highlight: "Published 2026",
  },
  {
    id: "023",
    name: "DSA in AI Paper",
    org: "Independent Research",
    period: "Oct 2025",
    category: "research",
    types: ["PSYCHIC"],
    icon: Network,
    description: "Research paper on the foundational role of data structures in AI systems.",
    detail:
      "Independent research paper: \"The Foundational Role of Data Structures and Algorithms in Artificial Intelligence Systems.\" Examines how classical CS fundamentals — sorting, searching, graph algorithms, dynamic programming — underpin modern AI infrastructure and ML systems at scale.",
    highlight: "Published Oct 2025",
  },
];
