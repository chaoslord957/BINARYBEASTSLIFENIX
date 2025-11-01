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
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  requiresPrescription: boolean;
  stock: number;
};

export type MedicalDocument = {
  id: string;
  name: string;
  type: 'Report' | 'Prescription' | 'Insurance';
  date: string;
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
};
