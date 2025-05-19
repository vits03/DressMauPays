import React from 'react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { Timestamp } from "firebase/firestore"

type Report = {
  id: string;
  imageURLs: string[];
  locality: string;
  urgency:string;
  createdAt: Timestamp;
  title: string;
  description: string;
};

const ReportCard = ({ id, imageURLs=[], locality, createdAt, title, description ,urgency}: Report) => {
  console.log("ReportCard props", { id, imageURLs, locality, createdAt, title, description });

  return (
    <Link href={`/report/${id}`}>
      <div className={`card-container relative urgency-${urgency} relative overflow-hidden w-full max-w-[19rem] border-2 border-gray-500 rounded-xl flex-shrink-0`}>
       <Image
  className="rounded-lg w-full h-[250px] object-cover"
  src={imageURLs[0]}
  placeholder="blur"
  blurDataURL="https://placehold.co/800x600.png"
  width={800}
  height={600}
  alt="Report Image"
/>

        <div className="card-details space-y-2 mt-2  px-3">
          <h2 className="card-title text-lg font-semibold text-gray-900 text-ellipsis line-clamp-1 my-1">{  title[0].toUpperCase()+title.substring(1)}</h2>
          <p className="card-description text-sm  text-gray-700 font-medium text-ellipsis line-clamp-1">
            {description}
          </p>
          <div className="badge-cont my-3 flex justify-between">
            <Badge className='rounded-2xl bg-gray-800'  >{locality}</Badge>
            <p className='text-xs text-gray-700 border-2 flex flex-col justify-center  border-gray-800 rounded-2xl px-2'>
              {createdAt.toDate().toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ReportCard
