"use client"
import { useState } from "react";
import FilterForm from "./FilterForm";
import { Funnel } from "lucide-react";


//create a  use state hook to save filter choices and products no to a state
//the hook 



type Filters = {
  village: string | null;
  urgency: string | null;
  order: string | null;
};

type FilterSidebarProps = {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters:Filters,
};
export default function FilterSidebar({setFilters,filters}:FilterSidebarProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="justify-items-end mb-3 ">
      {/* Mobile Filter Button (hidden on md and up) */}

      <button
        className="hide-on-md flex gap-2 px-3 py-2 bg-primary text-white rounded-full"
        onClick={() => setIsMobileFilterOpen(true)}
      >
          <Funnel /> <span>Filter</span>
      </button>

      {/* Mobile Slide-in Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity hide-on-md ${
          isMobileFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMobileFilterOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            ✕
          </button>

          <div className="p-6 space-y-6">
            <h2 className="text-xl  font-semibold">Filter Reports</h2>
            {/* Filter Form */}
            <FilterForm  setIsMobileFilterOpen={setIsMobileFilterOpen}  setFilters={setFilters} />
          </div>
        </div>
      </div>

      {/* Full Sidebar on Desktop (hidden on mobile) */}
      <div className="hidden block-on-md w-60 md:35 shrink-0 p-4 border-2 shadow-2xl rounded-2xl mr-5 border-gray-200 ">
        <h2 className="text-xl font-semibold mb-10">Filter Reports</h2>
        <FilterForm  setIsMobileFilterOpen={setIsMobileFilterOpen}  setFilters={setFilters}  />
      </div>
    </div>
  );
}

