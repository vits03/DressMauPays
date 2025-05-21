"use client";
import React from 'react'
import FeedClient from "@/components/feedClient";
import { DocumentData } from 'firebase/firestore';
import { useIsClient } from "@uidotdev/usehooks"

type FeedClientProps = {
  initialReports: DocumentData[];
};
const FeedClientWrapper = ({initialReports}:FeedClientProps) => {
const isClient = useIsClient();

        return  isClient ? <><FeedClient initialReports={initialReports} /></>:null;
    
}

export default FeedClientWrapper;
