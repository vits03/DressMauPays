"use client";
import { useEffect, useState,useRef } from "react";
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
import FilterSidebar from "./FilterSidebar";
import { useSessionStorage } from "@uidotdev/usehooks";

const PAGE_SIZE = 9;
interface ReportData {
  title: string;
  description: string;
  createdAt: any;  // or Timestamp, depending on your setup
  gps?: { latitude: number; longitude: number };
  urgency: string;
  imageURLs: string[];
  address: string;
  // add other fields here as needed
}

type FeedClientProps = {
  initialReports: DocumentData[];
};
type Filters = {
  village: string | null;
  urgency: string | null;
  order: string | null;
};
type sessionFilters = {
  village: string | null;
  urgency: string | null;
  order: string | null;
  noReports: number | null;
};

type Props = {
  filters: Filters;
};

const FeedClient = ({initialReports}:FeedClientProps) => {
  const isFirstRender =  useRef(true);

   const [sessionFilters, setSessionFilters] = useSessionStorage<sessionFilters>("filters", {
      village: null,
      urgency: null,
      order: null,
      noReports: 0,
   })
    const [filters, setFilters] = useState<Filters>({
      village: null,
      urgency: null,
      order: null,
    });
   

async function getLastDoc() {
    let q: any = query(
      collection(db, "reports"),
      where("isApproved", "==", true),
      where("isResolved", "==", false),
      orderBy("createdAt", "desc"),
    limit(PAGE_SIZE));

    const snapshot = await getDocs(q);
   console.log("therreal docc is",snapshot.docs[snapshot.docs.length - 1])
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  

}

    
      useEffect(()=>{
    console.log("session filters are",sessionFilters)
      },[sessionFilters])
  const [reports, setReports] = useState<DocumentData[]>(initialReports);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

useEffect(() => {
  setLoading(true);
      //(initialReports[initialReports.length - 1]);
      setHasMore(initialReports.length === PAGE_SIZE);
  getLastDoc();
  setLoading(false);
},[]);

 useEffect(() => { 
   
  // getLastDoc();
      console.log("the boolean for first render is",isFirstRender.current)
      console.log("initial filter is ",filters.order=== null);
 if (isFirstRender.current) {
    isFirstRender.current = false;
    return; // ❌ Skip first render
  } 
  if (filters.order !== null){
     console.log("fetch entr")
     fetchInitial();
  }
  // ✅ Run only when `filters` changes (not on mount)
 

}, [filters]); 
useEffect(()=>{
  console.log("the last doc is",lastDoc)
  const {village,urgency,order,noReports}=sessionFilters
  if (filters.order === null){
   setFilters({village,urgency,order})

  }
  else {
 setSessionFilters({ ...filters, noReports: reports.length })
  }

},[lastDoc])

  const fetchInitial = async () => {
    let productSize=0;
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
    const docs = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as DocumentData) }));
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
    const newDocs = snap.docs.map((doc) => ({ id: doc.id,  ...(doc.data() as ReportData) }));
    setReports((prev) => [...prev, ...newDocs]);
    setLastDoc(snap.docs[snap.docs.length - 1]);
    setHasMore(snap.docs.length === PAGE_SIZE);
    setLoading(false);
  };

  /** 
  useEffect(() => {
    fetchInitial();
  }, [filters]);*/

  return (
     <>
                <p className="ml-7 text-lg font-semibold">showing {reports.length} results</p>

        <div className="flex justify-center sidebar-md flex-col">

              <FilterSidebar filters={filters} setFilters={setFilters}/>
      

    <div className="flex flex-col ">
    <div className="my-grid  gap-4 justify-items-center">
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
        <Button onClick={fetchMore} className="w-fit mx-auto mt-5 rounded-full">
          Load More
        </Button>
      )}
      </div>
      </div>
      </>
  );
};

export default FeedClient;
