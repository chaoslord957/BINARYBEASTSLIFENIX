import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  group: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  online: boolean;
  rating: number;
  reviews: number;
};

export type Medicine = {
  id:string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  requiresPrescription: boolean;
  stock: number;
};

// This type represents the data structure in Firestore
export type MedicalDocument = {
  id: string;
  userId: string;
  filename: string;
  uploadDate: string; // ISO String
  fileType: string;
  fileSize: number; // in bytes
  storageLocation: string; // URL to the file in Firebase Storage
  aiInsights?: string;
  ocrContent?: string;
};


export type Article = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
};

export type AyurvedicRemedy = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  uses: string[];
};

export type HomeRemedy = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  steps: string[];
};
