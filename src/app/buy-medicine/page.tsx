import { PageHeader } from '@/components/PageHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart } from 'lucide-react';
import { medicines } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy Medicine | LifeNix',
};

export default function BuyMedicinePage() {
  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id);

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Medicine Delivery"
        description="Order medicines and health products to your doorstep."
      />
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search for medicines..."
              className="flex-1"
            />
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {medicines.map((medicine) => {
          const medImage = getImage(medicine.imageUrl);
          return (
            <Card key={medicine.id} className="flex flex-col">
              <CardHeader>
                <div className="relative h-40 w-full overflow-hidden rounded-md">
                  {medImage && (
                    <Image
                      src={medImage.imageUrl}
                      alt={medImage.description}
                      data-ai-hint={medImage.imageHint}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardTitle className="pt-4 font-headline tracking-normal text-lg">{medicine.name}</CardTitle>
                <CardDescription className='h-10'>{medicine.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">₹{medicine.price}</span>
                  {medicine.requiresPrescription && (
                    <Badge variant="destructive">Rx</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Stock: {medicine.stock > 0 ? `${medicine.stock} units` : 'Out of Stock'}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={medicine.stock === 0}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {medicine.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
