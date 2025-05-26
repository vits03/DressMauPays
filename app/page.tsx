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


export const metadata = {
  title: 'Dressmaupays – Report Local Issues in Mauritius',
  description:
    'Dressmaupays empowers Mauritian citizens to report problems in their locality—such as potholes, broken lights, or illegal dumping—and help build a better community.',
  openGraph: {
    title: 'Dressmaupays – Report Local Issues in Mauritius',
    description:
      'Use Dressmaupays to easily report civic issues in your neighborhood and make your voice heard. Together, we improve our communities across Mauritius.',
    url: 'https://dressmaupays.com', 
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/dressmaupays.firebasestorage.app/o/reports%2Fdressmaupays-logo-bg.-croppedjpg.webp?alt=media&token=8872b3dd-387e-42a2-a8ad-301fd9bdab4c', 
        width: 1024,
        height: 587,
        alt: 'Dressmaupays – Community Reporting Platform',
      },
    ],
  },
  keywords: [
    'Mauritius',
    'community reporting',
    'report issues',
    'local problems',
    'civic engagement',
    'Dressmaupays',
    'pothole report',
    'municipal issues',
  ],
  metadataBase: new URL('https://dressmaupays.com'), // Optional but useful
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
