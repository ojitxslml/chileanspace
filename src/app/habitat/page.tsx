
import { Suspense } from 'react';
import HabitatPage from './content';
import { Skeleton } from '@/components/ui/skeleton';

export default function Habitat() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><Skeleton className="h-20 w-20 rounded-full" /></div>}>
      <HabitatPage />
    </Suspense>
  );
}
