import Image from "next/image";
import { Button } from "@/components/ui/button"
import ReportCard from "@/components/ReportCard";
import FilterSidebar from "@/components/FilterSidebar";
export default function Home() {
  return (
    <div className="w-95/100 border-1 p-5 min-h-screen mx-auto max-w-7xl md:w-9/10">

    <div className="flex  md:flex-row flex-col">
      <FilterSidebar />
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-items-center"> 
      
  <ReportCard />
  <ReportCard />
  <ReportCard />
  <ReportCard />

  <ReportCard />

  {/* ...map through reports */}
</div>

     
    </div>
    </div>
  )
}

