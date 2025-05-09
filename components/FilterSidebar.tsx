"use client"
import { useState } from "react";
import FilterForm from "./FilterForm";
import { Funnel } from "lucide-react";

export default function FilterSidebar() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="justify-items-end mb-3">
      {/* Mobile Filter Button (hidden on md and up) */}
      <button
        className="md:hidden flex gap-2 p-2 bg-primary text-white rounded-md"
        onClick={() => setIsMobileFilterOpen(true)}
      >
          <Funnel /> <span>Filter</span>
      </button>

      {/* Mobile Slide-in Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity md:hidden ${
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
            <FilterForm />
          </div>
        </div>
      </div>

      {/* Full Sidebar on Desktop (hidden on mobile) */}
      <div className="hidden md:block w-60 md:40 shrink-0 p-4 border-2 shadow-2xl rounded-2xl mr-5 border-gray-200 ">
        <h2 className="text-xl font-semibold mb-10">Filter Reports</h2>
        <FilterForm />
      </div>
    </div>
  );
}

