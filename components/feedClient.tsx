"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "./ui/button";
import ReportCard from "./ReportCard";
import ReportCardSkeleton from "./reportCardSkeleton";

const PAGE_SIZE = 5;

type Filters = {
  village: string | null;
  urgency: string | null;
  order: string | null;
};

type Props = {
  filters: Filters;
};

const FeedClient = ({ filters }: Props) => {
  const [reports, setReports] = useState<DocumentData[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchInitial = async () => {
    setLoading(true);
    setReports([]);
    setLastDoc(null);
    setHasMore(true);

    let q: any = query(
      collection(db, "reports"),
      where("isApproved", "==", true),
      where("isResolved", "==", false)
    );

    if (filters.village && filters.village !== "selectAll") {
      q = query(q, where("locality", "==", filters.village));
    }
    if (filters.urgency && filters.urgency !== "all") {
      q = query(q, where("urgency", "==", filters.urgency));
    }

    if (filters.order === "ascending") {
      q = query(q, orderBy("createdAt", "asc"), limit(PAGE_SIZE));
    } else {
      q = query(q, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
    }

    const snap = await getDocs(q);
    const docs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setReports(docs);
    setLastDoc(snap.docs[snap.docs.length - 1]);
    setHasMore(snap.docs.length === PAGE_SIZE);
    setLoading(false);
  };

  const fetchMore = async () => {
    if (!lastDoc) return;
    setLoading(true);

    let q: any = query(
      collection(db, "reports"),
      where("isApproved", "==", true),
      where("isResolved", "==", false)
    );

    if (filters.village && filters.village !== "selectAll") {
      q = query(q, where("locality", "==", filters.village));
    }
    if (filters.urgency && filters.urgency !== "all") {
      q = query(q, where("urgency", "==", filters.urgency));
    }

    if (filters.order === "ascending") {
      q = query(q, orderBy("createdAt", "asc"), startAfter(lastDoc), limit(PAGE_SIZE));
    } else {
      q = query(q, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(PAGE_SIZE));
    }

    const snap = await getDocs(q);
    const newDocs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setReports((prev) => [...prev, ...newDocs]);
    setLastDoc(snap.docs[snap.docs.length - 1]);
    setHasMore(snap.docs.length === PAGE_SIZE);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitial();
  }, [filters]);

  return (
    <div className="flex flex-col">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-items-center">
      {loading && reports.length === 0
        ? Array.from({ length: 6 }).map((_, i) => <ReportCardSkeleton key={i} />)
        : reports.map((report) => (
            <ReportCard
              key={report.id}
              id={report.id}
              title={report.title}
              imageURLs={report.imageURLs}
              description={report.description}
              createdAt={report.createdAt}
              locality={report.locality}
              urgency={report.urgency}
            />
          ))}

     

    </div>
     {hasMore && !loading && (
        <Button onClick={fetchMore} className="mt-4 px-4 py-2 w-fit self-center bg-blue-500 text-white rounded">
          Load More
        </Button>
      )}
      </div>
  );
};

export default FeedClient;
