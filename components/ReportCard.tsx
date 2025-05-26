import React from 'react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { Timestamp } from "firebase/firestore"
import { FirebaseApp } from 'firebase/app'
import { create } from 'domain'
type Report = {
  id: string;
  imageURLs: string[];
  locality: string;
  urgency:string;
  createdAt: Timestamp ;
  title: string;
  description: string;
  index:number;
};
function toReadableDate(input: any): string {
  if (!input) return "No date";

  // Case 1: Firestore Timestamp
  if (typeof input === "object" && "seconds" in input && "nanoseconds" in input) {
    return new Timestamp(Number(input.seconds), Number(input.nanoseconds))
      .toDate()
      .toLocaleDateString("en-GB");
  }

  // Case 2: ISO string or JS Date
  const date = new Date(input);
  return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString("en-GB");
}
const ReportCard = ({ id, imageURLs=[], locality, createdAt, title, description ,urgency,index}: Report) => {
  console.log("ReportCard props", { id, imageURLs, locality, createdAt, title, description,index });

  return (
   <Link href={`/report/${id}`}>
  <div className={`card-container border-3 border-primary  relative urgency-${urgency} bg-white shadow-2xl card-small-screen-width md:w-[19rem] w-[20rem] border-gray-500 rounded-[12px] flex-shrink-0`}>
    <div className="w-full h-[260px] lg:h-[245px] card-small-screen-height overflow-hidden rounded-t-[9px]">
      <Image
      quality={40}
        className="w-full h-full  object-cover"
        src={imageURLs[0]}
        placeholder="blur"
        blurDataURL="https://placehold.co/800x600.png"
        width={800}
        height={600}
        alt="Report Image"
       
      />
    </div>

    <div className="card-details space-y-2 mt-2 px-3">
      <h2 className="card-title text-lg font-semibold text-gray-900  truncate  my-1">
        {title[0].toUpperCase() + title.substring(1)}
      </h2>
      <p className="card-description text-sm text-gray-700 font-medium truncate">
        {description}
      </p>
      <div className="badge-cont my-3 flex justify-between">
        <Badge className="rounded-2xl bg-primary">{locality}</Badge>
        <p className="text-xs text-primary border-primary border-2 flex items-center rounded-2xl px-2">
          {toReadableDate(createdAt)}
        </p>
      </div>
    </div>
  </div>
</Link>

   
  )
}

export default ReportCard
