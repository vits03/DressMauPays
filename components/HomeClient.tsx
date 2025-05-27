"use client";

import { useRef } from "react";
import FeedClientWrapper from "./FeedClientWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDownToDot } from "lucide-react";
type FeedClientProps = {
  initialReports: DocumentData[];
};
export default function HomeClient({ initialReports }: FeedClientProps) {
  const feedRef = useRef<HTMLDivElement>(null);

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-95/100 min-h-screen mx-auto max-w-7xl pb-17 md:w-9/10">

        
<div className="relative w-full  flex h-[calc(100vh-150px)] justify-center items-center md:h-auto md:aspect-[3/2] aspect-[3/4] max-w-4xl mx-auto my-10 border-2 rounded-2xl overflow-hidden">
  <Image
  src="/hero-mobile-blur.webp"
    alt="Background"
    fill // fills the container
    className="object-cover"
    priority // optional: preload for hero images
  />
          <div className="relative z-10 text-center text-white flex flex-col gap-5 md:gap-20 justify-between md:justify-center  items-center h-full p-10">

        <div className="space-y-10">
          
          <h1 className="text-3xl    opacity-100 font-semibold hero-mobile-small  "> 
          Welcome to<span className="text-accent"> DressMauPays</span></h1>
          <h2 className="font-semibold text-2xl hero-mobile-small ">Report any problems in your locality</h2>
          <h2 className="font-semibold text-lg hero-mobile-small ">Dangerous road conditions?</h2>
          <h2 className="font-semibold text-lg hero-mobile-small ">
            Vegetation overflowing on roads?
          </h2>
        </div>

        <div className="  md:space-x-3   space-y-5 flex  justify-center items-center  md:flex-row flex-col md:items-baseline ">
          <div>
            <Link href="/new-report">
              <Button className="text-md border-white py-5 border-3 text-white hover:text-accent font-bold bg-primary rounded-full">
                Report An Issue
              </Button>
            </Link>
          </div>
          <div>
            <Button
              className="text-md font-bold text-white bg-primary border-white py-5 border-3 hover:text-accent rounded-full"
              onClick={scrollToFeed}
            >
              View All Reports
            </Button>
          </div>

          <ArrowDownToDot onClick={scrollToFeed} size={70} className=" md:hidden"/>
        </div>
      </div>
 </div>
      <FeedClientWrapper ref={feedRef} initialReports={initialReports} />
    </div>
  );
}
