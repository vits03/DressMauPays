'use client';

import React, { forwardRef } from 'react';
import FeedClient from '@/components/feedClient';
import { DocumentData } from 'firebase/firestore';
import { useIsClient } from '@uidotdev/usehooks';

type FeedClientProps = {
  initialReports: DocumentData[];
};

const FeedClientWrapper = forwardRef<HTMLDivElement, FeedClientProps>(
  ({ initialReports }, ref) => {
    const isClient = useIsClient();

    return isClient ? (
      <div ref={ref}>
        <FeedClient initialReports={initialReports} />
      </div>
    ) : null;
  }
);

FeedClientWrapper.displayName = 'FeedClientWrapper'; // Required for forwardRef

export default FeedClientWrapper;
