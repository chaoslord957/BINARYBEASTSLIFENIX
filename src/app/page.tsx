import Link from 'next/link';
import {
  Ambulance,
  FileText,
  HeartPulse,
  Newspaper,
  Pill,
  Salad,
  Shield,
  Sparkles,
  Stethoscope,
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

const features = [
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
    title: 'Live Health Monitor',
    href: '/health-monitor',
    icon: HeartPulse,
    description: 'Track your vital health data.',
  },
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
    title: 'Personalized Diet Plan',
    href: '/diet-plan',
    icon: Salad,
    description: 'AI-generated nutritional plans.',
  },
  {
    title: 'Medical Vault',
    href: '/medical-vault',
    icon: Shield,
    description: 'Securely store your documents.',
  },
  {
    title: 'Ambulance Booking',
    href: '/book-ambulance',
    icon: Ambulance,
    description: 'Book an ambulance in emergencies.',
  },
  {
    title: 'Health Articles',
    href: '/articles',
    icon: Newspaper,
    description: 'Read the latest health blogs.',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Welcome to LifeNix"
        description="Your personal health companion. What would you like to do today?"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title}>
            <Card className="flex h-full flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline tracking-normal">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
