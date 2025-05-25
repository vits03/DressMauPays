"use client";

import { useRef } from "react";
import FeedClientWrapper from "./FeedClientWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useMediaQuery } from 'react-responsive'; // or use your own hook

type FeedClientProps = {
  initialReports: DocumentData[];
};
export default function HomeClient({ initialReports }: FeedClientProps) {
  const feedRef = useRef<HTMLDivElement>(null);
const isMobile = useMediaQuery({ maxWidth:642});

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-95/100 min-h-screen mx-auto max-w-7xl pb-17 md:w-9/10">

        
<div className="relative w-full  md:aspect-[3/2] aspect-[3/4] max-w-4xl mx-auto my-10 border-2 rounded-2xl overflow-hidden">
  <Image
  src={isMobile ? "/hero-mobile-blur.png" : "/hero-desktop-blur.png"}
    alt="Background"
    fill // fills the container
    className="object-cover"
    priority // optional: preload for hero images
  />
          <div className="relative z-10 text-center text-white flex flex-col gap-5 md:gap-10 justify-center items-center h-full p-10">

        
        <h1 className="text-3xl    opacity-100 font-semibold hero-mobile-small  "> 
Welcome to<span className="text-accent"> DressMauPays</span></h1>
        <h2 className="font-semibold text-lg hero-mobile-small ">Report any problems in your locality</h2>
        <h2 className="font-semibold text-lg hero-mobile-small ">Dangerous road conditions?</h2>
        <h2 className="font-semibold text-lg hero-mobile-small ">
          Vegetation overflowing on roads?
        </h2>

        <div className="     space-x-3 space-y-5 flex  justify-center items-center  md:flex-row flex-col md:items-baseline ">
          <div>
            <Link href="/add-report">
              <Button className="text-sm hover:text-accent font-bold bg-accent text-primary rounded-full">
                Report An Issue
              </Button>
            </Link>
          </div>
          <div>
            <Button
              className="text-sm font-bold bg-accent text-primary  hover:text-accent rounded-full"
              onClick={scrollToFeed}
            >
              View Reports
            </Button>
          </div>
        </div>
      </div>
 </div>
      <FeedClientWrapper ref={feedRef} initialReports={initialReports} />
    </div>
  );
}
