import { PageHeader } from '@/components/PageHeader';
import { doctors } from '@/lib/placeholder-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, Video } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consult a Doctor | LifeNix',
};

export default function ConsultDoctorPage() {
  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id);

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Find a Doctor"
        description="Book an appointment with a specialist."
      />
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              placeholder="Search by name, specialty, or symptom..."
              className="flex-1"
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="online" />
              <label
                htmlFor="online"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Available Online
              </label>
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {doctors.map((doctor) => {
          const docImage = getImage(doctor.avatar);
          return (
            <Card key={doctor.id} className="flex flex-col">
              <CardHeader className="flex-row items-start gap-4">
                <Avatar className="h-16 w-16 border">
                  {docImage && (
                    <Image
                      src={docImage.imageUrl}
                      alt={docImage.description}
                      data-ai-hint={docImage.imageHint}
                      width={64}
                      height={64}
                    />
                  )}
                  <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-headline tracking-normal text-lg">
                    {doctor.name}
                  </CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant={doctor.online ? 'default' : 'secondary'} className={doctor.online ? 'bg-green-600 hover:bg-green-700' : ''}>
                      {doctor.online ? 'Online' : 'Offline'}
                    </Badge>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{doctor.rating}</span>
                      <span className="text-sm text-muted-foreground">({doctor.reviews})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="mt-auto flex gap-2">
                <Button className="flex-1" variant="outline">
                  View Profile
                </Button>
                <Button className="flex-1">
                  <Video className="mr-2 h-4 w-4" />
                  Book Video Call
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
