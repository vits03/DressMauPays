
"use client"
import { useState } from "react";

export default function FeedWithSidebar() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="flex md:space-x-6">
      {/* Mobile Filter Button */}
      <button
        className="md:hidden p-2 bg-primary text-white rounded-md mb-4"
        onClick={() => setIsMobileFilterOpen(true)}
      >
        Filter
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

          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Filter Reports</h2>
            <FilterForm />
          </div>
        </div>
      </div>

      {/* Sidebar on Desktop */}
      <aside className="hidden md:block w-80 shrink-0 p-4 border-r border-gray-200 h-full">
        <h2 className="text-xl font-semibold mb-4">Filter Reports</h2>
        <FilterForm />
      </aside>

      {/* Feed Grid */}
      <main className="flex-1 p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Replace below with mapped cards */}
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </div>
      </main>
    </div>
  );
}

function FilterForm() {
  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-sm font-medium">Village</span>
        <input type="text" className="w-full border px-2 py-1 rounded" />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Date</span>
        <input type="date" className="w-full border px-2 py-1 rounded" />
      </label>
      <button className="w-full bg-primary text-white py-2 rounded">
        Apply Filters
      </button>
    </div>
  );
}

function ReportCard() {
  return (
    <div className="card-container w-full max-w-sm border-2 rounded-xl overflow-hidden">
      <img
        className="w-full h-auto"
        src="https://placehold.co/300x200.png"
        alt="Report image"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">Card Title</h2>
        <p className="text-sm line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, unde.
        </p>
        <div className="flex justify-between text-xs font-medium">
          <span>St Julien Village</span>
          <span>14 Apr 2024</span>
        </div>
      </div>
    </div>
  );
}
