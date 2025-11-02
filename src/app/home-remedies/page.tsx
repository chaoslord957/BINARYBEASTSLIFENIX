import { PageHeader } from '@/components/PageHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { homeRemedies } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Remedies & First Aid | LifeNix',
};

export default function HomeRemediesPage() {
  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id);

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Home Remedies & First Aid"
        description="Quick first aid tips for common household issues. Always seek professional medical advice for serious conditions."
      />

      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Medical Disclaimer</AlertTitle>
        <AlertDescription>
          The information provided here is for general informational purposes
          only and is not a substitute for professional medical advice,
          diagnosis, or treatment. For emergencies, please dial your local
          emergency number immediately.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {homeRemedies.map((remedy) => {
          const remedyImage = getImage(remedy.imageUrl);
          return (
            <Card key={remedy.id}>
              <CardHeader>
                {remedyImage && (
                  <div className="relative h-48 w-full overflow-hidden rounded-lg">
                    <Image
                      src={remedyImage.imageUrl}
                      alt={remedyImage.description}
                      data-ai-hint={remedyImage.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardTitle className="pt-4 font-headline tracking-normal text-xl">
                  {remedy.name}
                </CardTitle>
                <CardDescription>{remedy.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="mb-2 font-semibold">First Aid Steps:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {remedy.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
    