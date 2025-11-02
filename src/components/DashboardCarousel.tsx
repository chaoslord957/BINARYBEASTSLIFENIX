'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Autoplay from 'embla-carousel-autoplay';

export function DashboardCarousel() {
  const carouselImages = [
    'carousel-1',
    'carousel-2',
    'carousel-3',
    'carousel-4',
    'carousel-5',
  ];

  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id);

  return (
    <Carousel
      className="mb-6 overflow-hidden rounded-lg"
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
    >
      <CarouselContent>
        {carouselImages.map((id) => {
          const image = getImage(id);
          if (!image) return null;
          return (
            <CarouselItem key={id}>
              <div className="relative h-48 w-full md:h-64">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  data-ai-hint={image.imageHint}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}

    