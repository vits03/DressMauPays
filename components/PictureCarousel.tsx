import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselDemoProps = {
  imageURLs: string[];
};

export function CarouselDemo({ imageURLs }: CarouselDemoProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {imageURLs.map((imageURL, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden rounded-xl shadow-md">
                <CardContent className="p-0 relative aspect-[4/3] bg-white">
                  <Link href={imageURL}>
                    <div className="relative w-full aspect-[4/3]">
                      {" "}
                      {/* ✅ MUST BE RELATIVE and have dimensions */}
                      <Image
                        src={
                          imageURL ||
                          "https://placehold.co/800x600?text=No+Image"
                        }
                        alt={`Report image ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
