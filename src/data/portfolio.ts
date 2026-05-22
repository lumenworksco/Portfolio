import { PortfolioData } from "@/lib/types";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Florian Braun",
    tagline: "Computer Science Student & Full-Stack Developer",
    email: "florian.braun@example.com",
    location: "Munich, Germany",
    bio: [
      "I'm a third-year Computer Science student at the Technical University of Munich with a passion for building clean, performant web applications and exploring the intersection of software engineering and machine learning.",
      "When I'm not coding, you'll find me contributing to open-source projects, participating in hackathons, or exploring new technologies. I'm currently seeking internship opportunities in software engineering for Summer 2026.",
    ],
    github: "https://github.com/florianbraun",
    linkedin: "https://linkedin.com/in/florianbraun",
  },

  skills: [
    {
      category: "Languages",
      skills: [
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "Python" },
        { name: "Java" },
        { name: "C++" },
        { name: "SQL" },
        { name: "Rust" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "React" },
        { name: "Next.js" },
        { name: "Node.js" },
        { name: "Express" },
        { name: "FastAPI" },
        { name: "Tailwind CSS" },
        { name: "Spring Boot" },
      ],
    },
    {
      category: "Tools & Platforms",
      skills: [
        { name: "Git" },
        { name: "Docker" },
        { name: "AWS" },
        { name: "Linux" },
        { name: "CI/CD" },
        { name: "Vercel" },
        { name: "Figma" },
      ],
    },
    {
      category: "Databases & Other",
      skills: [
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Redis" },
        { name: "GraphQL" },
        { name: "REST APIs" },
        { name: "Firebase" },
      ],
    },
  ],

  projects: [
    {
      title: "StudySync",
      description:
        "A collaborative study platform for university students with real-time document editing, shared flashcards, and AI-powered study recommendations.",
      techStack: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "WebSocket",
        "OpenAI API",
      ],
      githubUrl: "https://github.com/florianbraun/studysync",
      demoUrl: "https://studysync-demo.vercel.app",
      featured: true,
    },
    {
      title: "CodeReview Bot",
      description:
        "A GitHub App that automatically reviews pull requests using static analysis and LLM-based suggestions, reducing code review time by 40%.",
      techStack: ["Python", "FastAPI", "GitHub API", "Docker", "GPT-4", "Redis"],
      githubUrl: "https://github.com/florianbraun/codereview-bot",
      featured: true,
    },
    {
      title: "Munich Transit Tracker",
      description:
        "A real-time public transit dashboard for Munich showing live departures, delay predictions, and route optimization using open data APIs.",
      techStack: [
        "React",
        "TypeScript",
        "Mapbox GL",
        "Node.js",
        "Express",
        "MVG API",
      ],
      githubUrl: "https://github.com/florianbraun/transit-tracker",
      demoUrl: "https://munich-transit.vercel.app",
      featured: true,
    },
    {
      title: "Neural Style Transfer App",
      description:
        "A web application that applies artistic style transfer to user-uploaded images using a custom-trained PyTorch model served via a REST API.",
      techStack: ["Python", "PyTorch", "Flask", "React", "AWS S3", "Docker"],
      githubUrl: "https://github.com/florianbraun/style-transfer",
      featured: false,
    },
  ],

  experience: [
    {
      title: "Software Engineering Intern",
      company: "Siemens Digital Industries",
      location: "Munich, Germany",
      startDate: "Jun 2025",
      endDate: "Sep 2025",
      description: [
        "Developed microservices for an industrial IoT platform processing 50K+ sensor events per second using Java and Spring Boot",
        "Built a real-time monitoring dashboard with React and D3.js, reducing incident response time by 30%",
        "Wrote comprehensive integration tests and set up CI/CD pipelines using Jenkins and Docker",
      ],
      techStack: ["Java", "Spring Boot", "React", "Docker", "Kafka"],
    },
    {
      title: "Working Student — Backend Development",
      company: "Celonis SE",
      location: "Munich, Germany",
      startDate: "Oct 2024",
      endDate: "Mar 2025",
      description: [
        "Contributed to the process mining platform backend, implementing new API endpoints in Python and FastAPI",
        "Optimized database queries reducing average response time by 25% for key analytics endpoints",
        "Participated in agile sprints, code reviews, and architecture design sessions",
      ],
      techStack: ["Python", "FastAPI", "PostgreSQL", "Kubernetes"],
    },
    {
      title: "Teaching Assistant — Data Structures & Algorithms",
      company: "Technical University of Munich",
      location: "Munich, Germany",
      startDate: "Apr 2024",
      endDate: "Sep 2024",
      description: [
        "Led weekly tutorial sessions for 35+ students covering sorting algorithms, graph theory, and dynamic programming",
        "Created supplementary problem sets and graded assignments, maintaining a 4.8/5.0 student satisfaction rating",
      ],
    },
  ],

  education: [
    {
      degree: "B.Sc. Computer Science (Informatik)",
      institution: "Technical University of Munich",
      location: "Munich, Germany",
      startDate: "Oct 2023",
      endDate: "Expected Jul 2026",
      gpa: "1.5 (German Scale)",
      coursework: [
        "Algorithms & Data Structures",
        "Distributed Systems",
        "Machine Learning",
        "Computer Networks",
        "Database Systems",
        "Software Engineering",
        "Operating Systems",
        "Linear Algebra & Discrete Mathematics",
      ],
      achievements: [
        "Dean's List 2024",
        "TUM Hackathon 1st Place (2024)",
        "Deutschlandstipendium Scholarship Recipient",
      ],
    },
  ],
};
