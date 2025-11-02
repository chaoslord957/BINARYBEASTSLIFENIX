import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Ambulance, MapPin } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Ambulance | LifeNix',
};

export default function BookAmbulancePage() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'ambulance-map-india');

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Book an Ambulance"
        description="Request emergency medical transport."
      />
      <div className="grid flex-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-6 md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-location">Current Location</Label>
                <Input
                  id="current-location"
                  placeholder="Enter your current location"
                  defaultValue="Fortis Hospital, Bengaluru"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Enter destination"
                  defaultValue="Manipal Hospital, Bengaluru"
                />
              </div>
              <Button size="lg" className="w-full">
                <Ambulance className="mr-2" />
                Book Now
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Feature Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Live ambulance booking and tracking are under development.
                This interface is for demonstration purposes.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="relative h-full min-h-[400px] overflow-hidden">
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                data-ai-hint={mapImage.imageHint}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-white" />
                <p className="mt-2 font-semibold text-white">
                  Live Ambulance Tracking Will Appear Here
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
