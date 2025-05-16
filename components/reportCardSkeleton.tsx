// components/ReportCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ReportCardSkeleton() {
  return (
    <div className=" w-[19rem] border-2 rounded-xl p-3   border-gray-500 space-y-4">
      <Skeleton className="h-48  bg-gray-300 w-full rounded-xl" />
      <Skeleton className="h-5  bg-gray-300 w-3/4" />
      <Skeleton className="h-4  bg-gray-300 w-full" />
      <div className="flex   justify-between">
        <Skeleton className="h-6 w-20 bg-gray-300 rounded-full" />
        <Skeleton className="h-6 w-10 bg-gray-300  rounded-full" />
      </div>
    </div>
  );
}