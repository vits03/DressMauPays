'use client';

import { useRef } from 'react';
import FeedClientWrapper from './FeedClientWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DocumentData } from 'firebase/firestore';
type FeedClientProps = {
  initialReports: DocumentData[];
};
export default function HomeClient({ initialReports }: FeedClientProps) {
  const feedRef = useRef<HTMLDivElement>(null);

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-95/100 min-h-screen mx-auto max-w-7xl pb-17 md:w-9/10">
      <div className="aspect-auto md:bg-top hero max-w-4xl bg-cover my-10 py-10 border-2 mx-auto rounded-2xl text-white hero flex flex-col gap-10 justify-center items-center">
        <h1 className="text-2xl w-8/10 font-semibold text-center">
          Report Any Problems in your locality!
        </h1>
        <h2 className="font-medium">Potholes?</h2>
        <h2 className="font-medium">Dangerous road conditions?</h2>
        <h2 className="font-medium">Vegetation overflowing on roads?</h2>

        <div className="space-x-5">
          <Link href="/add-report">
            <Button className="text-sm rounded-full">Report An Issue</Button>
          </Link>
          <Button className="text-sm rounded-full" onClick={scrollToFeed}>
            View Reports
          </Button>
        </div>
      </div>

      <FeedClientWrapper ref={feedRef} initialReports={initialReports} />
    </div>
  );
}
