"use client"
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import NextImageWithLoader from '@/components/NextImageWithSpinner';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NextImageWithSpinner from "@/components/NextImageWithSpinner";

type CarouselDemoProps = {
  imageURLs: string[];
};

export function CarouselDemo({ imageURLs }: CarouselDemoProps) {
    const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full border-1 rounded-2xl border-primary max-w-xl mx-auto">
      <Carousel className="w-full ">
        <CarouselContent>
          {imageURLs.map((imageURL, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden rounded-xl bg-background shadow-md">
                <CardContent className="p-0 relative aspect-[4/3] bg-background">
                  <Link href={imageURL}>
                    <div className="relative w-full aspect-[4/3]">
                      {" "}
                      {/* ✅ MUST BE RELATIVE and have dimensions */}
                     <NextImageWithSpinner
  src={imageURL}
  alt={`Report image ${index + 1}`}
  sizes="(max-width: 768px) 100vw, 800px"
  index={index}
/>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {imageURLs.length > 1 && <><CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" /></>}
        
      </Carousel>
    </div>
  );
}
