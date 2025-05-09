import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo() {
  return (
    <Carousel className="w-8/10 max-w-md">
      <CarouselContent>
      
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <Image
                              className="rounded-xl w-full h-auto"
                              src="https://placehold.co/800x600.png"
                              width={800}
                              height={600}
                              alt="Picture of the author"
                            />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <Image
                              className="rounded-xl w-full h-auto"
                              src="https://placehold.co/800x600.png"
                              width={800}
                              height={600}
                              alt="Picture of the author"
                            />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
       
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
