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

  const quotes = [
    'The secret of getting ahead is getting started.',
    'Your health is an investment, not an expense.',
    'A little progress each day adds up to big results.',
    'Believe you can and you\'re halfway there.',
    'The best way to predict the future is to create it.',
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
        {carouselImages.map((id, index) => {
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
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
                  <blockquote className="text-center text-xl font-semibold text-white md:text-2xl">
                    "{quotes[index]}"
                  </blockquote>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
