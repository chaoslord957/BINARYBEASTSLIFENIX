import type { Doctor, Article, MedicalDocument, Medicine } from './types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    avatar: 'doctor-1',
    online: true,
    rating: 4.9,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Dr. Rahul Verma',
    specialty: 'Dermatologist',
    avatar: 'doctor-2',
    online: false,
    rating: 4.8,
    reviews: 95,
  },
  {
    id: '3',
    name: 'Dr. Anjali Singh',
    specialty: 'Pediatrician',
    avatar: 'doctor-3',
    online: true,
    rating: 4.9,
    reviews: 210,
  },
  {
    id: '4',
    name: 'Dr. Vikram Rathore',
    specialty: 'Neurologist',
    avatar: 'doctor-4',
    online: true,
    rating: 4.7,
    reviews: 76,
  },
];

export const medicines: Medicine[] = [
    { id: '1', name: 'Paracetamol 500mg', price: 20, imageUrl: 'https://picsum.photos/seed/med1/200/200', requiresPrescription: false, stock: 150 },
    { id: '2', name: 'Amoxicillin 250mg', price: 150, imageUrl: 'https://picsum.photos/seed/med2/200/200', requiresPrescription: true, stock: 80 },
    { id: '3', name: 'Cetirizine 10mg', price: 50, imageUrl: 'https://picsum.photos/seed/med3/200/200', requiresPrescription: false, stock: 200 },
    { id: '4', name: 'Aspirin 75mg', price: 15, imageUrl: 'https://picsum.photos/seed/med4/200/200', requiresPrescription: false, stock: 120 },
];

export const medicalDocuments: MedicalDocument[] = [
    { id: '1', name: 'Annual Health Checkup', type: 'Report', date: '2023-10-15' },
    { id: '2', name: 'ENT Consultation Notes', type: 'Prescription', date: '2023-09-22' },
    { id: '3', name: 'Star Health Policy', type: 'Insurance', date: '2023-01-01' },
    { id: '4', name: 'Blood Test Results', type: 'Report', date: '2023-08-05' },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Benefits of Daily Yoga',
    excerpt: 'Discover how incorporating a daily yoga practice can transform your physical and mental health...',
    author: 'Asha Patel',
    date: '2024-05-20',
    imageUrl: 'article-1',
  },
  {
    id: '2',
    title: 'Eating Right: A Guide to a Balanced Indian Diet',
    excerpt: 'Explore the principles of a balanced diet tailored to Indian cuisine and lifestyles...',
    author: 'Ravi Kumar',
    date: '2024-05-18',
    imageUrl: 'article-2',
  },
  {
    id: '3',
    title: 'Mindfulness and Mental Peace',
    excerpt: 'Learn techniques for mindfulness and meditation to reduce stress and find inner calm...',
    author: 'Sunita Desai',
    date: '2024-05-15',
    imageUrl: 'article-3',
  },
];
