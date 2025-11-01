import { PageHeader } from '@/components/PageHeader';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Symptom Checker | LifeNix',
};

export default function SymptomCheckerPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="AI Symptom Checker"
        description="Analyze your symptoms with our AI assistant."
      />
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-background p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Our AI-powered symptom checker is currently under development.
              Please check back later!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
