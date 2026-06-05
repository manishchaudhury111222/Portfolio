import { UserProfile, Project, Experience, Education, SkillCategory, Certification } from './types';

export const userProfile: UserProfile = {
  name: "Manish Chaudhury",
  title: "Backend Developer & AI Specialist",
  email: "manishchaudhury111222@gmail.com",
  phone: "(+91) 6001069488",
  github: "https://github.com/manishchaudhury111222",
  linkedin: "https://www.linkedin.com/in/manish-chaudhury-820400251/",
  bio: "I am a Backend Developer with experience in designing, developing, and maintaining scalable web applications and APIs. My expertise includes PHP, Laravel, JavaScript, Python, MySQL, and modern web technologies, enabling me to build secure, efficient, and high-performance backend systems. In addition to backend development, I have hands-on experience with full-stack technologies such as MongoDB, Express.js, React.js, and Node.js, allowing me to collaborate effectively across the entire development lifecycle. I have also worked on AI and data-driven projects, including disease prediction and fraud detection systems, where I applied data analysis, feature engineering, and machine learning concepts to generate meaningful insights. I am passionate about solving complex technical challenges, optimizing application performance, and building innovative solutions that deliver real value to users. My goal is to continuously enhance my technical expertise while contributing to impactful software products and emerging AI-driven technologies."
};

export const experiences: Experience[] = [
  {
    id: "sembark",
    role: "Backend Developer",
    company: "Sembark Travel Software",
    location: "On-site / Jaipur",
    period: "Jan 8th, 2026 - Present",
    current: true,
    type: "job",
    techStack: ["PHP", "Laravel", "REST APIs", "SQL", "AI"],
    highlights: [
      "Contributing actively to core backend development, focusing on building high-performance, secure server-side logic and highly modular systems.",
      "Spearheading infrastructure refinements and API development, ensuring high availability, speed, and seamless integration with front-end components.",
      "Optimizing SQL queries and database schemas for highly transactional workflows to handle reservation data with minimal read-write latency.",
      "Collaborating with engineering teams to enhance and deployment-pipeline backend microservices on cloud configurations."
    ]
  },
  {
    id: "outlier",
    role: "Freelancing Developer",
    company: "Outlier",
    period: "Oct 2024 - Apr 2025",
    current: false,
    type: "freelance",
    techStack: ["Python", "Generative AI", "Prompt Engineering", "Code Refinement"],
    highlights: [
      "Gained deep expertise in refining AI model outputs and improving conversational AI capabilities.",
      "Maintained and enhanced technical codebases to support analytics and model evaluations for engineering teams."
    ]
  },
  {
    id: "bharat-intern",
    role: "Web Development Intern",
    company: "Bharat Intern (Virtual Internship)",
    period: "Sep 2023 - Oct 2023",
    current: false,
    type: "internship",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    highlights: [
      "Developed an interactive feature in a web application that significantly improved overall user experience.",
      "Gained hands-on experience in native JavaScript, CSS styles, and semantic HTML layouts."
    ]
  },
  {
    id: "nestle",
    role: "Nestlé E-Learning student",
    company: "Nestle",
    period: "Mar 2025",
    current: false,
    type: "academic",
    techStack: ["Circular Economy", "Sustainability", "Innovation Systems"],
    highlights: [
      "Gained deep insights into circular economy principles and sustainable packaging innovation.",
      "Explored real-world applications of technology in environmental impact and footprint reduction."
    ]
  }
];

export const educationList: Education[] = [
  {
    degree: "B.Tech in Computer Science & Engineering (Data Science)",
    institution: "Meerut Institute of Technology, Meerut",
    score: "76.06%",
    period: "Aug'22 - June'26"
  },
  {
    degree: "XII (AHSEC)",
    institution: "B. Borooah College, Guwahati",
    score: "77.8%",
    period: "2022"
  },
  {
    degree: "X (SEBA)",
    institution: "Angels' English High School, Guwahati",
    score: "81.33%",
    period: "2020"
  }
];

export const skillsList: SkillCategory[] = [
  {
    name: "Programming & Data Analysis",
    skills: ["Python", "Java", "C++ (Basic)", "PHP", "Pandas", "NumPy", "SQL", "SQLite"],
    icon: "Code"
  },
  {
    name: "Web Development",
    skills: ["HTML", "CSS", "JavaScript", "MongoDB", "Express", "React", "Node", "Laravel", "Tailwind CSS"],
    icon: "Globe"
  },
  {
    name: "Machine Learning",
    skills: ["scikit-learn", "Logistic Regression", "Random Forest", "Decision Trees", "Model Evaluation Metrics"],
    icon: "Brain"
  },
  {
    name: "Data Processing",
    skills: ["Data Cleaning", "Handling Missing Values", "Outlier Treatment", "Multicollinearity Removal", "Feature Engineering"],
    icon: "Cpu"
  },
  {
    name: "Visualization & Reporting",
    skills: ["Matplotlib", "Seaborn", "Plotly", "Data Storytelling", "Tableau", "Jupyter Notebook", "Excel"],
    icon: "BarChart"
  },
  {
    name: "Statistical Analysis",
    skills: ["Hypothesis Testing", "Correlation Analysis", "Regression Analysis"],
    icon: "TrendingUp"
  },
  {
    name: "Software & Cloud Tools",
    skills: ["MS Office", "Cloud Services", "Jupyter Notebook & Lab", "Git & GitHub"],
    icon: "Server"
  }
];

export const projectsList: Project[] = [
  {
    id: "healthguard-ai",
    title: "HealthGuard AI",
    type: "AI-Powered Healthcare Web Application",
    date: "May 2026",
    demoUrl: "https://innovative-healthgaurd-ai.vercel.app/",
    description: "An intelligent healthcare web application that analyzes user symptoms, predicts possible diseases, assesses risk levels, and provides personalized health insights to promote early health awareness.",
    bullets: [
      "Developed a symptom-based disease prediction system evaluating symptom combinations, severity, and duration to generate top 3 probable health conditions.",
      "Built MediBot, an AI-inspired medical chatbot conducting interactive symptom analysis by asking customized follow-up questions.",
      "Designed a personalized health profile system storing user info, diagnosis history, and trend tracking.",
      "Integrated smart risk detection to identify severe symptoms and suggest immediate clinical medical attention.",
      "Developed a highly responsive modern UI with multi-lingual support, health analytics dashboard, and explainable AI prediction reasoning."
    ],
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Node.js", "Prisma ORM", "SQLite", "JavaScript", "REST APIs", "Vercel"],
    category: "ml"
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    type: "Laravel 11 Project",
    date: "Dec 2025",
    description: "A secure, multi-tenant URL shortening service built on Laravel 11 and SQLite.",
    bullets: [
      "Features robust Role-Based Access Control (RBAC) to manage multi-tenant Companies and Users.",
      "Designed with a modern, high-contrast dark-themed UI powered by Tailwind CSS and optimized Laravel Blade Templates."
    ],
    techStack: ["PHP", "Laravel 11", "SQLite", "Tailwind CSS", "Blade Templates", "Git"],
    category: "web"
  },
  {
    id: "blood-bank",
    title: "Blood Bank Application",
    type: "MERN Stack Project",
    date: "Sep 2025",
    description: "A complete, highly secured and user-friendly portal managing emergency blood stocks, donation histories, and consumer requests.",
    bullets: [
      "Crafted full-stack capabilities including secured state database management and interactive consumer portal.",
      "Handles request processing, live blood-group availability status lists, and credentials authorization."
    ],
    techStack: ["MongoDB", "Express", "React", "Node", "JavaScript", "Bootstrap"],
    category: "web"
  },
  {
    id: "fraud-detection",
    title: "Fraud Detection System",
    type: "Data Science & Machine Learning",
    date: "Aug 2025",
    description: "A predictive model to detect fraudulent transactions from a financial record set of over 6.3 Million+ details, helping reduce risks and increase reliability.",
    bullets: [
      "Built, cleaned, and engineered comprehensive features for financial security detection datasets.",
      "Evaluated multiple key candidate classifiers like Logistic Regression, Decision Trees, and Random Forests for optimal recall metrics."
    ],
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "Jupyter Notebook"],
    category: "ml"
  },
  {
    id: "air-canvas",
    title: "Air Canvas",
    type: "Computer Vision Gesture Drawing",
    date: "Dec 2024",
    description: "A hand gesture-based virtual drawing tool bridging human movements with digital creativity through real-time camera feeds.",
    bullets: [
      "Designed gesture tracking using OpenCV and Google's MediaPipe coordinates tracking libraries.",
      "Engineered clean real-time noise-filtering matrix operations to draw coordinates on virtual boards."
    ],
    techStack: ["Python", "OpenCV", "MediaPipe", "NumPy", "Jupyter Notebook"],
    category: "systems"
  },
  {
    id: "portfolio-converter",
    title: "Portfolio & Temp Converter",
    type: "Frontend Engineering Project",
    date: "Oct 2023",
    description: "Developed a personal portfolio and a temperature converter application to demonstrate core layout and calculation structures.",
    bullets: [
      "HTML forms structure, responsive CSS layouts, and native JS calculations for instant temperatures conversions."
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "systems"
  }
];

export const certifications: Certification[] = [
  { name: "Google AI Professional", issuer: "Google", year: "2026", category: "ai-ml" },
  { name: "ServiceNow Certified System Administrator", issuer: "ServiceNow", year: "2025", category: "cloud" },
  { name: "AWS Solution Architecture Certificate", issuer: "Forage", year: "2025", category: "cloud" },
  { name: "MongoDB Node.js Developer Path", issuer: "MongoDB", year: "2025", category: "programming" },
  { name: "Introduction to MongoDB", issuer: "MongoDB (For Students)", year: "2025", category: "programming" },
  { name: "Python Course for Beginners: Mastering Essentials", issuer: "Scaler", year: "2024", category: "programming" },
  { name: "Programming using Java", issuer: "Infosys", year: "2025", category: "programming" },
  { name: "Introduction to Modern AI", issuer: "Cisco", year: "2025", category: "ai-ml" },
  { name: "Generative AI Literacy", issuer: "FutureSkills Prime", year: "2025", category: "ai-ml" },
  { name: "DCA Certification", issuer: "Computech Learning Centre (CLC)", year: "2021", category: "general" },
  { name: "Prompt Engineering", issuer: "Sololearn", year: "2025", category: "ai-ml" },
  { name: "Generative AI in Practice & Intro to LLMs", issuer: "Sololearn", year: "2025", category: "ai-ml" },
  { name: "ML for Beginners", issuer: "Sololearn", year: "2025", category: "ai-ml" },
  { name: "Data Analytics, Technology & Cyber", issuer: "Deloitte / Accenture", year: "2025", category: "general" }
];
