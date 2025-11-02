import { PageHeader } from '@/components/PageHeader';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Home } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Remedies | LifeNix',
};

export default function HomeRemediesPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Home Remedies"
        description="Find natural and effective home remedies for common ailments."
      />
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-background p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Our home remedies section is currently under development. Please
              check back later!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
