
"use client"
import Image from "next/image";


import { Button } from "@/components/ui/button"
import ReportCard from "@/components/ReportCard";
import FilterSidebar from "@/components/FilterSidebar";
import FeedClient from "@/components/feedClient";
import { Suspense, useEffect } from "react";
import ReportCardSkeleton from "@/components/reportCardSkeleton";
import { useState } from "react";
  type Filters = {
  village: string | null;
  urgency: string | null;
  order: string | null;
};
export default function Home() {

const [filters, setFilters] = useState<Filters>({
  village: null,
  urgency: null,
  order: null,
});

  useEffect(()=>{
console.log(filters)
  },[filters])
  /// get all items from firebase where reports = ( isApproved=true && isResolved=false)
  return (
    <div className="w-95/100 border-1 p-5 min-h-screen mx-auto max-w-7xl md:w-9/10">
    <div className="flex  md:flex-row flex-col">
      <FilterSidebar setFilters={setFilters}/>
      <FeedClient  filters={filters}/>

  


     
    </div>
    </div>
  )
}

