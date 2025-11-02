import type { Doctor, Article, MedicalDocument, Medicine, AyurvedicRemedy, HomeRemedy } from './types';

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

export const homeopathicDoctors: Doctor[] = [
    {
      id: 'homeo-1',
      name: 'Dr. Samuel Hahnemann',
      specialty: 'Homeopathic Consultant',
      avatar: '',
      online: true,
      rating: 4.8,
      reviews: 112,
    },
    {
      id: 'homeo-2',
      name: 'Dr. Melanie Grubman',
      specialty: 'Classical Homeopathy',
      avatar: '',
      online: false,
      rating: 4.9,
      reviews: 98,
    },
];

export const ayurvedicDoctors: Doctor[] = [
    {
      id: 'ayur-1',
      name: 'Vaidya. Anika Joshi',
      specialty: 'Ayurvedic Practitioner (B.A.M.S)',
      avatar: 'ayurvedic-doctor-1',
      online: true,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 'ayur-2',
      name: 'Vaidya. Rishi Mehra',
      specialty: 'Panchakarma Specialist',
      avatar: 'ayurvedic-doctor-2',
      online: false,
      rating: 4.8,
      reviews: 72,
    },
];

export const ayurvedicRemedies: AyurvedicRemedy[] = [
    {
        id: 'remedy-1',
        name: 'Ashwagandha',
        description: 'An adaptogenic herb known for its ability to reduce stress and anxiety.',
        imageUrl: 'remedy-ashwagandha',
        uses: ['Reduces cortisol levels', 'Boosts brain function', 'Fights symptoms of anxiety and depression'],
    },
    {
        id: 'remedy-2',
        name: 'Turmeric (Haldi)',
        description: 'A powerful anti-inflammatory and antioxidant spice, commonly used in Indian cuisine.',
        imageUrl: 'remedy-turmeric',
        uses: ['Reduces inflammation', 'Improves heart health', 'May help prevent cancer'],
    },
    {
        id: 'remedy-3',
        name: 'Triphala',
        description: 'A polyherbal medicine consisting of amla, bibhitaki, and haritaki.',
        imageUrl: 'remedy-triphala',
        uses: ['Improves digestion', 'Acts as a natural laxative', 'Supports healthy weight management'],
    }
]

export const homeRemedies: HomeRemedy[] = [
  {
    id: 'first-aid-1',
    name: 'Minor Cuts and Scrapes',
    description: 'Proper care for small cuts can prevent infection.',
    imageUrl: 'remedy-minor-cut',
    steps: [
      'Wash your hands thoroughly with soap and water.',
      'Gently clean the wound with cool, clean water to remove any dirt or debris.',
      'Apply gentle pressure with a clean cloth to stop any bleeding.',
      'Apply a thin layer of antibiotic ointment (if available).',
      'Cover the wound with a sterile bandage.',
    ],
  },
  {
    id: 'first-aid-2',
    name: 'Minor Burns (First-Degree)',
    description: 'Quick action can help soothe pain and prevent further damage.',
    imageUrl: 'remedy-minor-burn',
    steps: [
      'Immediately hold the burned area under cool (not cold) running water for about 10-15 minutes.',
      'Remove any tight jewelry or clothing from the affected area.',
      'Apply a moisturizer like aloe vera gel to soothe the skin.',
      'Cover the burn with a sterile, non-fluffy dressing.',
      'Do not use ice, as it can cause more damage to the skin.',
    ],
  },
  {
    id: 'first-aid-3',
    name: 'Insect Bites and Stings',
    description: 'Relieve itching and swelling from common insect bites.',
    imageUrl: 'remedy-insect-bite',
    steps: [
      'If the stinger is still present, gently scrape it out with a flat-edged object like a credit card.',
      'Wash the area with soap and water.',
      'Apply a cold pack or cloth filled with ice to the area for 10-15 minutes to reduce swelling and pain.',
      'Apply calamine lotion or a paste of baking soda and water to reduce itching.',
      'Avoid scratching, as it can lead to infection.',
    ],
  },
];

export const medicines: Medicine[] = [
    { id: '1', name: 'Paracetamol 500mg', description: 'A common pain reliever and fever reducer.', price: 20, imageUrl: 'medicine-1', requiresPrescription: false, stock: 150 },
    { id: '2', name: 'Amoxicillin 250mg', description: 'An antibiotic used to treat bacterial infections.', price: 150, imageUrl: 'medicine-2', requiresPrescription: true, stock: 80 },
    { id: '3', name: 'Cetirizine 10mg', description: 'An antihistamine used for allergies.', price: 50, imageUrl: 'medicine-3', requiresPrescription: false, stock: 200 },
    { id: '4', name: 'Aspirin 75mg', description: 'Used to reduce pain, fever, or inflammation.', price: 15, imageUrl: 'medicine-4', requiresPrescription: false, stock: 120 },
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

    