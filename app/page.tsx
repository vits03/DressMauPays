import Image from "next/image";
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
import Link from "next/link";
import FeedClientWrapper from "@/components/FeedClientWrapper";
import { Button } from "@/components/ui/button";
import ReportCard from "@/components/ReportCard";
import FilterSidebar from "@/components/FilterSidebar";
import FeedClient from "@/components/feedClient";
import { db } from "@/lib/firebase";
import  heroImg from "@/public/hero-section.png"
import ReportCardSkeleton from "@/components/reportCardSkeleton";
import { GetStaticProps } from "next";
export const revalidate = 60; // ✅ Enables ISR every 60s
import HomeClient from "@/components/HomeClient";
type HomePageProps = {
  reports: DocumentData[];
};
const getReports = async () => {
  let q: any = query(
    collection(db, "reports"),
    where("isApproved", "==", true),
    where("isResolved", "==", false)
  );
  q = query(q, orderBy("createdAt", "desc"), limit(12));
  const snap = await getDocs(q);
  const docs = snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as DocumentData),
  }));
  return snap.docs.map((doc) => {
    const data = doc.data() as DocumentData;

    return {
      id: doc.id,
      ...data,
      createdAt: (data.createdAt.toDate() as Date) ?? null, // 🔁 Convert Firestore Timestamp to string
      resolvedAt: null,
    };
  });
};

export default async function Home() {
  const reports: DocumentData[] = await getReports(); // ✅

  /// get all items from firebase where reports = ( isApproved=true && isResolved=false)
  return (

      <HomeClient initialReports={reports} />
  );
}
