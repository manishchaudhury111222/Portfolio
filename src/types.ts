export interface Project {
  id: string;
  title: string;
  type: string;
  date: string;
  demoUrl?: string;
  description: string;
  bullets?: string[];
  techStack: string[];
  category: 'web' | 'ml' | 'systems';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  current: boolean;
  type: 'job' | 'internship' | 'freelance' | 'academic';
  highlights: string[];
  techStack?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  score: string;
  period: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
  icon: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  category: 'cloud' | 'ai-ml' | 'programming' | 'general';
}

export interface UserProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  bio: string;
}
