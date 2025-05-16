import React from "react";
import Link from "next/link";
import { CircleChevronLeft } from "lucide-react";
import Image from "next/image";
import { CarouselDemo } from "@/components/PictureCarousel";
import { MapPin } from "lucide-react";
import { LogIn } from "lucide-react";
const report = () => {
  return (
    <div className="w-95/100 border-1 p-5 min-h-screen mx-auto max-w-4xl md:w-9/10">
      <Link href="/">
        {" "}
        <div className="flex gap-2">
          <CircleChevronLeft />
          <p>Back</p>
        </div>
      </Link>

      <div className=" flex flex-col justify-center items-center mt-10 w-full report-container">
        <h1 className="text-3xl text-semibold mb-10">Burst water Pipe</h1>

        <CarouselDemo imageURLs={} />

        <div className="report-description border-2  max-w-2xl flex flex-col gap-5 p-4 mt-10 rounded-2xl">
          <div>
            <h2 className="text-xl font-semibold mb-1 ">Description</h2>
            <p>
              cwa water pipe has burst and is leaking onto the street causing
              trouble to inhabitants
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1 ">Address</h2>
            <p>Royal Road , st julien Road, opposite SBM Bank</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1 ">Date posted</h2>
            <p>14th April 2024</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1 ">Urgency</h2>
            <div className="px-5 py-1 text-sm text-white w-fit rounded-2xl bg-red-600">
              High
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1 ">Location</h2>
            <div className="flex gap-2 py-3 px-5 border-2 bg-gray-300 w-fit rounded-xl">
              <p className="font-semibold">Open in maps</p>
              <LogIn />
            </div>
          </div>

      
        </div>
 <div className="border-2 mt-10 flex justify-center items-center gap-5 py-5 rounded-2xl flex-col  px-3 max-w-2xl">

        <h2 className="text-2xl font-semibold">Is this report already resolved?</h2>
        <p>if yes , upload a photo below to provide proof.</p>
        <button className="bg-gray-900 px-4 py-1 rounded-2xl text-white">Upload Photo</button>
    </div>

      </div>
    </div>
  );
};

export default report;
