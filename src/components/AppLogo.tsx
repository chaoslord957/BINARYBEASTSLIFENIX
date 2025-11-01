import { HeartPulse } from 'lucide-react';
import Link from 'next/link';

export function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
        <HeartPulse className="h-5 w-5" />
      </div>
      <span className="font-headline text-lg font-bold tracking-tight text-foreground">
        LifeNix
      </span>
    </Link>
  );
}
