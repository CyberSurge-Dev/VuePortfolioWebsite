// src/types/portfolio.ts

export interface Education {
  institution: string;
  years: string;
  gpa: string;
  honors: string;
  degrees: string[];
  description: string;
}

export interface SkillItem {
  name: string;
  years: string;
  description: string;
}

export interface SkillsData {
  tabs: { id: string; label: string }[];
  categories: Record<string, SkillItem[]>;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  bullets: string[];
  technologies: string[];
}

export interface Award {
  title: string;
  category: string;
  date: string;
  description: string;
  link: string | null;
}

export interface AboutMeData {
  education: Education[];
  skills: SkillsData;
  experience: Experience[];
  awards: Award[];
}

export interface Tag {
  name: string;
  color: string;
}

export interface MetaArticles {
  tags: Tag[];
}

export interface LinkItem {
  name: string;
  url: string;
}

export interface ArticleMeta {
  name: string;
  description: string;
  tags: string[];
  repositories: LinkItem[];
  otherLinks: LinkItem[];
  publishDate: string;
  coverImages: string[];
  files: LinkItem[]; // <-- New property for downloadable files!
  folderName?: string;
}