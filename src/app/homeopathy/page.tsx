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
import { homeopathicDoctors } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Homeopathy | LifeNix',
};

export default function HomeopathyPage() {
  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id);
  const originImage = getImage('homeopathy-origin');

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Homeopathy"
        description="Discover homeopathic remedies and practitioners."
      />

      <section className="mb-8">
        <h2 className="mb-4 font-headline text-2xl font-bold">
          Available Nearby
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {homeopathicDoctors.map((doctor) => {
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
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6">
              <CardTitle className="font-headline text-2xl">
                The Origin of Homeopathy
              </CardTitle>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">
                  Homeopathy was created in the late 18th century by Samuel
                  Hahnemann, a German physician. Its principles are based on
                  the idea of "like cures like" (similia similibus
                  curentur), where a substance that causes symptoms in a
                  healthy person can be used in a diluted form to treat
                  similar symptoms in a sick person.
                  <br />
                  <br />
                  Hahnemann believed that these highly diluted preparations
                  could stimulate the body's self-healing mechanisms. The
                  practice involves a holistic approach, considering the
                  individual's physical, mental, and emotional state to
                  prescribe remedies.
                </p>
              </CardContent>
            </div>
            {originImage && (
              <div className="relative min-h-[250px] w-full">
                <Image
                  src={originImage.imageUrl}
                  alt={originImage.description}
                  data-ai-hint={originImage.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
