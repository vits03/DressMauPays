import React from 'react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { global } from 'styled-jsx/css'
import Link from 'next/link'
const ReportCard = () => {
  return (
    <Link href="/report">
<div className="card-container relative urgency-high w-full  max-w-[19rem] border-2 rounded-xl flex-shrink-0">
  <Image
                className="rounded-xl w-full h-auto"
                src="https://placehold.co/800x600.png"
                width={800}
                height={600}
                alt="Picture of the author"
              />
  <div className="card-details space-y-3 px-3">
    <h2 className="card-title text-lg font-semibold my-2">Burst Pipe</h2>
    <p className="card-description text-sm font-medium line-clamp-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, unde.lorem24
    </p>
    <div className="badge-cont my-2 flex  justify-between">
      <Badge className='rounded-2xl'>St Julien Village</Badge>
      <p className='text-xs text-gray-700 border-2 rounded-2xl px-2'>14/04/25</p>
    </div>
  </div>
</div>
</Link>
  )
}

export default ReportCard
