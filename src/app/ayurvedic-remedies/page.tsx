import { PageHeader } from '@/components/PageHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle } from 'lucide-react';
import { ayurvedicDoctors, ayurvedicRemedies } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ayurvedic Remedies | LifeNix',
};

export default function AyurvedicRemediesPage() {
  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id);

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Ayurvedic Remedies"
        description="Explore traditional and natural ayurvedic remedies."
      />

      <section className="mb-8">
        <h2 className="mb-4 font-headline text-2xl font-bold">
          Consult Ayurvedic Practitioners
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {ayurvedicDoctors.map((doctor) => {
            const docImage = getImage(doctor.avatar);
            return (
              <Card key={doctor.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-20 w-20 border">
                    {docImage && (
                      <Image
                        src={docImage.imageUrl}
                        alt={docImage.description}
                        data-ai-hint={docImage.imageHint}
                        width={80}
                        height={80}
                      />
                    )}
                    <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="font-headline tracking-normal text-xl">
                      {doctor.name}
                    </CardTitle>
                    <CardDescription>{doctor.specialty}</CardDescription>
                    <Badge
                      variant={doctor.online ? 'default' : 'secondary'}
                      className={`mt-2 ${
                        doctor.online ? 'bg-green-600 hover:bg-green-700' : ''
                      }`}
                    >
                      {doctor.online ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-headline text-2xl font-bold">
          Common Herbal Remedies
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ayurvedicRemedies.map((remedy) => {
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
                  <h4 className="mb-2 font-semibold">Common Uses:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {remedy.uses.map((use, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
