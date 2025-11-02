import Link from 'next/link';
import {
  Ambulance,
  FileText,
  HeartPulse,
  Home,
  Newspaper,
  Pill,
  Salad,
  Shield,
  Sparkles,
  Sprout,
  Stethoscope,
  Droplets,
  BrainCircuit,
  HeartHandshake,
  BookOpen,
} from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageHeader } from '@/components/PageHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | LifeNix',
};

const featureGroups = [
  {
    category: 'AI Tools',
    icon: BrainCircuit,
    features: [
      {
        title: 'AI Symptom Checker',
        href: '/symptom-checker',
        icon: Sparkles,
        description: 'Get insights on your symptoms.',
      },
      {
        title: 'Medical Report Summarizer',
        href: '/report-summarizer',
        icon: FileText,
        description: 'Summarize and understand reports.',
      },
      {
        title: 'Personalized Diet Plan',
        href: '/diet-plan',
        icon: Salad,
        description: 'AI-generated nutritional plans.',
      },
    ],
  },
  {
    category: 'Core Services',
    icon: HeartHandshake,
    features: [
      {
        title: 'Doctor Consultation',
        href: '/consult-doctor',
        icon: Stethoscope,
        description: 'Book appointments with specialists.',
      },
      {
        title: 'Medicine Delivery',
        href: '/buy-medicine',
        icon: Pill,
        description: 'Order medicines to your doorstep.',
      },
      {
        title: 'Ambulance Booking',
        href: '/book-ambulance',
        icon: Ambulance,
        description: 'Book an ambulance in emergencies.',
      },
      {
        title: 'Live Health Monitor',
        href: '/health-monitor',
        icon: HeartPulse,
        description: 'Track your vital health data.',
      },
      {
        title: 'Medical Vault',
        href: '/medical-vault',
        icon: Shield,
        description: 'Securely store your documents.',
      },
    ],
  },
  {
    category: 'Wellness & Knowledge',
    icon: BookOpen,
    features: [
      {
        title: 'Ayurvedic Remedies',
        href: '/ayurvedic-remedies',
        icon: Sprout,
        description: 'Explore traditional remedies.',
      },
      {
        title: 'Homeopathy',
        href: '/homeopathy',
        icon: Droplets,
        description: 'Find homeopathic solutions.',
      },
      {
        title: 'Home Remedies',
        href: '/home-remedies',
        icon: Home,
        description: 'Find natural home remedies.',
      },
      {
        title: 'Health Articles',
        href: '/articles',
        icon: Newspaper,
        description: 'Read the latest health blogs.',
      },
    ],
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Welcome to LifeNix"
        description="Your personal health companion. What would you like to do today?"
      />
      <div className="flex flex-col gap-8">
        {featureGroups.map((group) => (
          <section key={group.category}>
            <div className="mb-4 flex items-center gap-3">
              <group.icon className="h-6 w-6 text-primary" />
              <h2 className="font-headline text-2xl font-bold tracking-tight">
                {group.category}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.features.map((feature) => (
                <Link href={feature.href} key={feature.title}>
                  <Card className="flex h-full flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="font-headline tracking-normal">
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
